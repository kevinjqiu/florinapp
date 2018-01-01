import * as fs from "fs";
import * as transactionService from "./transactionService";
import db from "../db";
import reset from "../db/reset";
import Account from "../models/Account";
import Transaction from "../models/Transaction";

const defaultFetchOptions = {
  pagination: {
    perPage: 999,
    page: 1
  },
  filters: {}
};

describe("transactionService.importAccountStatement", () => {
  beforeEach(async () => {
    await reset();
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
    await reset();
  });

  it("should return transactions ordered by date asc by default", async () => {
    await db.post(new Transaction({ _id: "txn1", date: "2017-01-01" }));
    await db.post(new Transaction({ _id: "txn2", date: "2017-02-01" }));
    await db.post(new Transaction({ _id: "txn3", date: "2017-01-15" }));
    const result = await transactionService.fetch(defaultFetchOptions);
    expect(result.result.map(t => t._id)).toEqual(["txn1", "txn3", "txn2"]);
  });

  it("should fetch the associated account", async () => {
    const accountId = (await db.post(new Account({ name: "TEST" }))).id;
    await db.post(
      new Transaction({ _id: "txn1", date: "2017-01-01", accountId })
    );
    const result = await transactionService.fetch(defaultFetchOptions);
    const transactions = result.result;
    expect(transactions.length).toEqual(1);
    expect(transactions[0].account._id).toEqual(accountId);
    expect(transactions[0].account.name).toEqual("TEST");
  });

  it("should set the associated account to undefined when accountId not found", async () => {
    const accountId = "NONEXISTENT";
    await db.post(
      new Transaction({ _id: "txn1", date: "2017-01-01", accountId })
    );
    const result = await transactionService.fetch(defaultFetchOptions);
    const transactions = result.result;
    expect(transactions.length).toEqual(1);
    expect(transactions[0].account).toBe(undefined);
  });

  it.skip("should return transactions ordered by desc when requested", async () => {
    await db.post(new Transaction({ _id: "txn1", date: "2017-01-01" }));
    await db.post(new Transaction({ _id: "txn2", date: "2017-02-01" }));
    await db.post(new Transaction({ _id: "txn3", date: "2017-01-15" }));
    const result = await transactionService.fetch({
      orderBy: ["date", "desc"],
      pagination: {
        perPage: 999,
        page: 1
      },
      filters: {}
    });
    const transactions = result.result;
    expect(transactions.map(t => t._id)).toEqual(["txn2", "txn3", "txn1"]);
  });

  it("should return transactions filtered by date", async () => {
    await db.post(new Transaction({ _id: "txn1", date: "2017-01-01" }));
    await db.post(new Transaction({ _id: "txn2", date: "2017-01-15" }));
    await db.post(new Transaction({ _id: "txn3", date: "2017-02-01" }));

    const result = await transactionService.fetch({
      pagination: {
        perPage: 999,
        page: 1
      },
      filters: {
        dateFrom: "2017-01-01",
        dateTo: "2017-01-31"
      }
    });
    const transactions = result.result;
    expect(transactions.map(t => t._id)).toEqual(["txn1", "txn2"]);
  })
});
describe("transactionService.updateCategory", () => {
  beforeEach(async () => {
    await reset();
  });

  it("should update transaction category", async () => {
    const response = await db.post(new Transaction());
    await transactionService.updateCategory(
      response.id,
      "automobile-carpayment"
    );
    const transaction = await db.get(response.id);
    expect(transaction.categoryId).toEqual("automobile-carpayment");
  });
});
