import * as fs from "fs";
import * as transactionService from "./transactionService";
import db from "../db";
import reset from "../db/reset";
import Account from "../models/Account";
import Transaction from "../models/Transaction";

describe("transactionService.importAccountStatement", () => {
  beforeEach(async () => {
    await reset()();
  });

  const newAccount = async (): Account => {
    let account = await db.post(
      new Account({
        name: "Test",
        financialInstitution: "TEST_FI",
        type: "CHECKING"
      })
    );
    account = await db.get(account.id);
    return new Account(account);
  };

  it("should not import any transactions if OFX is empty", async () => {
    const account = await newAccount();
    const content = fs.readFileSync(`${__dirname}/fixtures/notxn.ofx`);
    const file = new Blob([content]);
    const {
      numImported,
      numSkipped
    } = await transactionService.importAccountStatement(account, file);
    expect(numImported).toBe(0);
    expect(numSkipped).toBe(0);
  });

  it("should import new transactions", async () => {
    const account = await newAccount();
    const content = fs.readFileSync(`${__dirname}/fixtures/newtxns.ofx`);
    const file = new Blob([content]);
    const {
      numImported,
      numSkipped
    } = await transactionService.importAccountStatement(account, file);
    expect(numImported).toBe(3);
    expect(numSkipped).toBe(0);
    const response = await db.find({
      selector: { "metadata.type": "Transaction" }
    });
    expect(response.docs.length).toBe(3);
  });

  it("should existing transactions", async () => {
    const account = await newAccount();
    const content = fs.readFileSync(`${__dirname}/fixtures/newtxns.ofx`);
    const file = new Blob([content]);
    expect(await transactionService.importAccountStatement(account, file), {
      numImported: 3,
      numSkipped: 0
    });
    expect(await transactionService.importAccountStatement(account, file), {
      numImported: 0,
      numSkipped: 3
    });
    const response = await db.find({
      selector: { "metadata.type": "Transaction" }
    });
    expect(response.docs.length).toBe(3);
  });
});

describe("transactionService.fetch", () => {
  beforeEach(async () => {
    await reset()();
  });

  it("should return transactions ordered by date by default", async () => {
    await db.post(new Transaction({_id: "txn1", date: "2017-01-01"}));
    await db.post(new Transaction({_id: "txn2", date: "2017-02-01"}));
    await db.post(new Transaction({_id: "txn3", date: "2017-01-15"}));
    const transactions = await transactionService.fetch();
    expect(transactions.map(t => t._id)).toEqual(["txn1", "txn3", "txn2"]);
  });

  it("should fetch the associated account", async () => {
    const accountId = (await db.post(new Account({name: "TEST"}))).id;
    await db.post(new Transaction({_id: "txn1", date: "2017-01-01", accountId}));
    const transactions = await transactionService.fetch();
    expect(transactions.length).toEqual(1);
    expect(transactions[0].account._id).toEqual(accountId);
    expect(transactions[0].account.name).toEqual("TEST");
  });

  it("should set the associated account to undefined when accountId not found", async () => {
    const accountId = "NONEXISTENT";
    await db.post(new Transaction({_id: "txn1", date: "2017-01-01", accountId}));
    const transactions = await transactionService.fetch();
    expect(transactions.length).toEqual(1);
    expect(transactions[0].account).toBe(undefined);
  });
});