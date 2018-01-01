// @flow
import PromiseFileReader from "promise-file-reader";
import Account from "../models/Account";
import Transaction from "../models/Transaction";
import db from "../db";
import OfxAdapter from "./OfxAdapter";
import type FetchOptions from "./FetchOptions";
import PaginationResult from "./PaginationResult";
import { thisMonth } from "../models/presetDateRanges";

const thisMonthDateRange = thisMonth();

export const defaultFetchOptions = {
  orderBy: ["date", "asc"],
  pagination: {
    perPage: 10,
    page: 1
  },
  filters: {
    dateFrom: thisMonthDateRange.start.format("YYYY-MM-DD"),
    dateTo: thisMonthDateRange.end.format("YYYY-MM-DD")
  }
};

export const fetch = async (
  options: FetchOptions = defaultFetchOptions
): Promise<PaginationResult<Transaction>> => {
  const mapFun = (doc, emit) => {
    if (doc.metadata && doc.metadata.type === "Transaction") {
      emit(doc.date, null);
    }
  };
  const { pagination } = options;
  const { filters } = options;
  const startkey = filters.dateFrom ? filters.dateFrom : "";
  const endkey = filters.dateTo ? filters.dateTo : "9999";
  const totalRows = (await db.query(mapFun, { startkey, endkey })).rows.length;
  const response = await db.query(mapFun,
    {
      startkey,
      endkey,
      include_docs: true,
      limit: pagination.perPage,
      skip: (pagination.page - 1) * pagination.perPage
    }
  );

  const transactions = response.rows.map(row => new Transaction(row.doc));
  const accountIds = new Set(transactions.map(t => t.accountId));
  const promises = [...accountIds].filter(aid => !!aid).map(async aid => {
    try {
      const doc = await db.get(aid);
      return new Account(doc);
    } catch (error) {
      if (error.status === 404) {
        return undefined;
      }
      throw error;
    }
  });
  const accounts = await Promise.all(promises);
  const accountMap = accounts.reduce((aggregate, current) => {
    if (current !== undefined) {
      aggregate.set(current._id, current);
    }
    return aggregate;
  }, new Map());

  transactions.forEach(t => {
    t.account = accountMap.get(t.accountId);
  });

  return new PaginationResult(transactions, totalRows);
};

export const updateCategory = async (
  transactionId: string,
  categoryId: string
) => {
  const txn = await db.get(transactionId);
  txn.categoryId = categoryId;
  await db.put(txn);
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
