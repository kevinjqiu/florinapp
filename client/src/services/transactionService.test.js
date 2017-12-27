import * as fs from "fs";
import * as transactionService from "./transactionService";
import db from "../db";
import reset from "../db/reset";
import Account from "../models/Account";

describe("transactionService.importAccountStatement", () => {
  beforeEach(() => {
    reset();
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
    return account;
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
    expect(numImported).toBe(11);
    expect(numSkipped).toBe(0);
    const response = await db.find({
      selector: { "metadata.type": "Transaction" }
    });
    expect(response.docs.length).toBe(11);
  });

  it("should existing transactions", async () => {
    const account = await newAccount();
    const content = fs.readFileSync(`${__dirname}/fixtures/newtxns.ofx`);
    const file = new Blob([content]);
    expect(await transactionService.importAccountStatement(account, file), {
      numImported: 11,
      numSkipped: 0
    });
    expect(await transactionService.importAccountStatement(account, file), {
      numImported: 0,
      numSkipped: 11
    });
    const response = await db.find({
      selector: { "metadata.type": "Transaction" }
    });
    expect(response.docs.length).toBe(11);
  });
});
