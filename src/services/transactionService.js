// @flow
import PromiseFileReader from "promise-file-reader";
import Account from "../models/Account";
import Transaction from "../models/Transaction";
import db from "../db";
import OfxAdapter from "./OfxAdapter";

export const fetchTransactions = async (): Promise<Array<Transaction>> => {
  await db.createIndex({
    index: {
      fields: ["date"]
    }
  });
  const response = await db.find({
    selector: {
      $and: [{ "metadata.type": "Transaction" }]
    },
    sort: ["date"],
    limit: Number.MAX_SAFE_INTEGER // A hack to temporarily get around the lack of no limit to db.find
  });

  const transactions = response.docs.map(doc => new Transaction(doc));
  const accountIds = new Set(transactions.map(t => t.accountId));
  const promises = [...accountIds].filter(aid => !!aid).map(async aid => {
    const doc = await db.get(aid);
    return new Account(doc);
  });
  const accounts = await Promise.all(promises);
  const accountMap = accounts.reduce((aggregate, current) => {
    aggregate.set(current._id, current);
    return aggregate;
  }, new Map());

  transactions.forEach(t => {
    t.account = accountMap.get(t.accountId);
  });

  return transactions;
};

export const saveNewTransaction = async (transaction: Transaction) => {
  const response = await db.find({
    selector: {
      "metadata.type": {
        $eq: "Transaction"
      },
      checksum: {
        $eq: transaction.checksum
      }
    }
  });
  if (response.docs.length !== 0) {
    throw { error: "Transaction is already imported" };
  }
  await db.post(transaction);
};

export const importAccountStatement = async (
  account: Account,
  statementFile: File
): Promise<{ numImported: number, numSkipped: number }> => {
  const fileContent = await PromiseFileReader.readAsText(statementFile);
  const ofxAdapter = new OfxAdapter(fileContent);
  const transactions = await ofxAdapter.getTransactions(account);
  const dbPromises = transactions.map(async t => {
    try {
      await saveNewTransaction(t);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  });

  const resolvedResults = await Promise.all(dbPromises);
  const numImported = resolvedResults.filter(r => r === true).length;
  const numSkipped = resolvedResults.filter(r => r === false).length;

  const balance = await ofxAdapter.getBalance();
  account.addAccountBalanceRecord(balance.dateTime, balance.amount);
  await db.put(account);
  return { numImported, numSkipped };
};
