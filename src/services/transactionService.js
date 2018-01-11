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
import { CategorySummary, Summary } from "../models/CategorySummary";
import Category from "../models/Category";
import { categoryTypes } from "../models/CategoryType";

const thisMonthDateRange = thisMonth();

// TODO: make this a function
export const defaultFetchOptions = {
  orderBy: ["date", "desc"],
  pagination: {
    perPage: 10,
    page: 1
  },
  filters: {
    dateFrom: thisMonthDateRange.start.format("YYYY-MM-DD"),
    dateTo: thisMonthDateRange.end.format("YYYY-MM-DD"),
    showAccountTransfers: false,
    showOnlyUncategorized: false
  }
};

const fetchAssociatedObjects = async (associatedObjectIds: Set<string>, fetchObjectById) => {
  const promises = [...associatedObjectIds].map(async aid => {
    try {
      return await fetchObjectById(aid);
    } catch (error) {
      if (parseInt(error.status, 10) === 404) {
        return undefined;
      }
      throw error;
    }
  });
  const associatedObjects = await Promise.all(promises);
  const associatedObjectsMap = associatedObjects.reduce((aggregate, current) => {
    if (current !== undefined) {
      aggregate.set(current._id, current);
    }
    return aggregate;
  }, new Map());

  return associatedObjectsMap;
}

const fetchTransactionAccounts = async (transactions: Array<Transaction>) => {
  const accountIds = new Set(transactions.filter(t => t.accountId).map(t => t.accountId));
  const accountMap = await fetchAssociatedObjects(accountIds, async (aid) => {
    const doc = await db.get(aid);
    return new Account(doc);
  });
  transactions.forEach(t => {
    t.account = accountMap.get(t.accountId);
  });
};

const fetchLinkedTransactions = async (transactions: Array<Transaction>) => {
  const transactionIds = new Set(
    transactions.filter(t => t.linkedTo).map(t => t.linkedTo)
  );
  const transactionMap = await fetchAssociatedObjects(transactionIds, async (tid) => {
    const doc = await db.get(tid);
    return new Transaction(doc);
  });
  transactions.forEach(t => {
    t.linkedToTransaction = transactionMap.get(t.linkedTo);
  });
};

const getViewQueryOptions = (options: FetchOptions) => {
  const { filters } = options;
  if (filters.showOnlyUncategorized) {
    return {
      viewName: "transactions/byCategoryAndDate",
      startkey: [null, filters.dateFrom ? filters.dateFrom : ""],
      endkey: [null, filters.dateTo ? filters.dateTo : "9999"]
    }
  }
  const viewName = filters.showAccountTransfers ? "transactions/byDate" : "transactions/byDateWithoutAccountTransfers";
  const startkey = filters.dateFrom ? filters.dateFrom : "";
  const endkey = filters.dateTo ? filters.dateTo : "9999";
  return {
    viewName,
    startkey,
    endkey
  };
};

export const fetch = async (options: FetchOptions = defaultFetchOptions): Promise<PaginationResult<Transaction>> => {
  const { pagination, orderBy } = options;
  const { viewName, startkey, endkey } = getViewQueryOptions(options);
  const totalRows = (await db.query(viewName, {
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
  const response = await db.query(viewName, queryOptions);
  const transactions = response.rows.map(row => new Transaction(row.doc));
  await fetchTransactionAccounts(transactions);
  await fetchLinkedTransactions(transactions);
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
  };
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

export const sumByType = async (filter: { dateFrom: string, dateTo: string }) => {
  let result = await db.query("transactions/byType", {
    startkey: [transactionTypes.CREDIT, filter.dateFrom],
    endkey: [transactionTypes.CREDIT, filter.dateTo]
  });
  const totalCredit = result.rows.length > 0 ? result.rows[0].value : 0;

  result = await db.query("transactions/byType", {
    startkey: [transactionTypes.DEBIT, filter.dateFrom],
    endkey: [transactionTypes.DEBIT, filter.dateTo]
  });
  const totalDebit = result.rows.length > 0 ? result.rows[0].value : 0;

  return {
    [transactionTypes.CREDIT]: totalCredit,
    [transactionTypes.DEBIT]: totalDebit
  };
};

export const sumByCategory = async (filter: { dateFrom: string, dateTo: string }): Promise<CategorySummary> => {
  const options = {
    startkey: [filter.dateFrom],
    endkey: [filter.dateTo]
  };
  const result = await db.query("transactions/byCategory", options);
  const stats = result.rows.length > 0 ? result.rows[0].value : null;
  let incomeCategories = [];
  let expensesCategories = [];

  if (stats) {
    const categoryIds = new Set(Object.keys(stats))
    const categoryMap = await fetchAssociatedObjects(categoryIds, async (cid) => {
      const doc = await db.get(cid);
      return new Category(doc);
    });

    const summaries = [...categoryIds].map(categoryId => {
      const category = categoryMap.get(categoryId);
      if (!category) {
        return null;
      }

      const categorySummary = new Summary({
          categoryId,
          categoryName: category.name,
          categoryType: category.type,
          parentCategoryId: category.parent,
          amount: stats[categoryId]
      });

      return categorySummary
    });
    incomeCategories = summaries.filter(cs => cs && cs.categoryType === categoryTypes.INCOME);
    expensesCategories = summaries.filter(cs => cs && cs.categoryType === categoryTypes.EXPENSE);
    incomeCategories.sort((a, b) => b.amount - a.amount);
    expensesCategories.sort((a, b) => a.amount - b.amount);
  }
  return new CategorySummary({
    incomeCategories,
    expensesCategories
  });
};