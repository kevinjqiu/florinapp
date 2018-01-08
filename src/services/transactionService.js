// @flow
import PromiseFileReader from "promise-file-reader";
import Account from "../models/Account";
import Transaction from "../models/Transaction";
import db from "../db";
import OfxAdapter from "./OfxAdapter";
import type FetchOptions from "./FetchOptions";
import PaginationResult from "./PaginationResult";
import { thisMonth } from "../models/presetDateRanges";
import { transactionTypes } from "../models/TransactionType";

const thisMonthDateRange = thisMonth();

export const defaultFetchOptions = {
  orderBy: ["date", "desc"],
  pagination: {
    perPage: 10,
    page: 1
  },
  filters: {
    dateFrom: thisMonthDateRange.start.format("YYYY-MM-DD"),
    dateTo: thisMonthDateRange.end.format("YYYY-MM-DD")
  }
};

const fetchTransactionAccounts = async (transactions: Array<Transaction>) => {
  const accountIds = new Set(transactions.map(t => t.accountId));
  const promises = [...accountIds].filter(aid => !!aid).map(async aid => {
    try {
      const doc = await db.get(aid);
      return new Account(doc);
    } catch (error) {
      if (parseInt(error.status, 10) === 404) {
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
};

const fetchLinkedTransactions = async (transactions: Array<Transaction>) => {
  const transactionIds = new Set(transactions.filter(t => t.linkedTo).map(t => t.linkedTo));
  const promises = [...transactionIds].map(async tid => {
    try {
      const doc = await db.get(tid);
      return new Transaction(doc);
    } catch (error) {
      if (parseInt(error.status, 10) === 404) {
        return undefined;
      }
      throw error;
    }
  });
  const linkedTransactions = await Promise.all(promises);
  const transactionMap = linkedTransactions.reduce((aggregate, current) => {
    if (current !== undefined) {
      aggregate.set(current._id, current);
    }
    return aggregate;
  }, new Map());

  transactions.forEach(t => {
    t.linkedToTransaction = transactionMap.get(t.linkedTo);
  });
}

export const fetch = async (
  options: FetchOptions = defaultFetchOptions
): Promise<PaginationResult<Transaction>> => {
  const { pagination, filters, orderBy } = options;
  const startkey = filters.dateFrom ? filters.dateFrom : "";
  const endkey = filters.dateTo ? filters.dateTo : "9999";
  const totalRows = (await db.query("transactions/byDate", {
    startkey,
    endkey
  })).rows.length;
  let queryOptions = {
    include_docs: true,
    limit: pagination.perPage,
    skip: (pagination.page - 1) * pagination.perPage
  };
  if (orderBy[1] === "asc") {
    queryOptions = {
      ...queryOptions,
      startkey,
      endkey
    };
  } else {
    queryOptions = {
      ...queryOptions,
      startkey: endkey,
      endkey: startkey,
      descending: true
    };
  }
  const response = await db.query("transactions/byDate", queryOptions);
  const transactions = response.rows.map(row => new Transaction(row.doc));
  await fetchTransactionAccounts(transactions);
  await fetchLinkedTransactions(transactions)
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

export const fetchTransactionLinkCandidates = async (transaction: Transaction): Promise<Array<Transaction>> => {
  const amount = "" + parseFloat(transaction.amount) * -1;
  const options = {
    startkey: [amount, "9999"],
    endkey: [amount, ""],
    include_docs: true,
    descending: true
  }
  const response = await db.query("transactions/byAmount", options);
  const transactions = response.rows.map(r => new Transaction(r.doc));
  await fetchTransactionAccounts(transactions);
  return transactions;
};

export const linkTransactions = async (
  transaction1: Transaction,
  transaction2: Transaction
) => {
  transaction1.linkedTo = transaction2._id;
  transaction1.categoryId = "internaltransfer";
  transaction2.linkedTo = transaction1._id;
  transaction2.categoryId = "internaltransfer";
  await db.put(transaction1);
  await db.put(transaction2);
};

export const sumByType = async (filter: {dateFrom: string, dateTo: string}) => {
  let result = await db.query("transactions/byType", {
    startkey: [transactionTypes.CREDIT, filter.dateFrom],
    endkey: [transactionTypes.CREDIT, filter.dateTo]
  });
  const totalCredit = result.rows.length > 0 ? result.rows[0].value : 0;

  result = await db.query("transactions/byType", {
    startkey: [transactionTypes.DEBIT, filter.dateFrom],
    endkey: [transactionTypes.DEBIT, filter.dateTo]
  });
  const totalDebit = result.rows.length > 0 ? result.rows[0].value: 0;

  return {
    [transactionTypes.CREDIT]: totalCredit,
    [transactionTypes.DEBIT]: totalDebit
  }
};