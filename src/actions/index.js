// @flow
import { push } from "react-router-redux";
import * as actionCreators from "./creators";
import * as transactionService from "../services/transactionService";
import * as accountService from "../services/accountService";
import * as categoryService from "../services/categoryService";
import * as syncService from "../services/syncService";
import type FetchOptions from "../services/FetchOptions";
import DateRange from "../models/DateRange";
import Account from "../models/Account";
import Transaction from "../models/Transaction";
import Sync from "../models/Sync";
import { Location } from "react-router";
import * as links from "../models/links";
import seed from "../db/seed";
import db from "../db";

export const fetchAccounts = () => async dispatch => {
  dispatch(actionCreators.fetchAccountsRequested());
  try {
    const accounts = await accountService.fetch();
    dispatch(actionCreators.fetchAccountsSucceeded(accounts));
  } catch (err) {
    dispatch(
      actionCreators.showErrorNotification("Cannot fetch accounts", err)
    );
    dispatch(actionCreators.fetchAccountsFailed(err));
  }
};

export const deleteAccount = (accountId: string) => async dispatch => {
  dispatch(actionCreators.deleteAccountRequested(accountId));
  try {
    await accountService.del(accountId);
    dispatch(actionCreators.showSuccessNotification("The account was deleted"));
    dispatch(actionCreators.deleteAccountSucceeded(accountId));
  } catch (err) {
    dispatch(
      actionCreators.showErrorNotification("Cannot delete account", err)
    );
    dispatch(actionCreators.deleteAccountFailed(err));
  }
};

export const createAccount = (accountData: Account) => async dispatch => {
  try {
    const account = await accountService.create(accountData);
    dispatch(actionCreators.createAccountSucceeded(account));
    dispatch(push("/accounts"));
    dispatch(actionCreators.showSuccessNotification("Account created"));
  } catch (err) {
    dispatch(
      actionCreators.showErrorNotification("Account creation failed", err)
    );
    dispatch(actionCreators.createAccountFailed(err));
  }
};

export const fetchAccountById = (accountId: string) => async dispatch => {
  try {
    const account = await accountService.fetchById(accountId);
    dispatch(actionCreators.fetchAccountByIdSucceeded(account));
  } catch (err) {
    dispatch(
      actionCreators.showErrorNotification("Failed to get account", err)
    );
  }
};

export const updateAccount = (
  accountId: string,
  accountData: Account
) => async dispatch => {
  try {
    const account = await accountService.update(accountId, accountData);
    dispatch(actionCreators.updateAccountSucceeded(account));
    dispatch(push("/accounts"));
    dispatch(actionCreators.showSuccessNotification("Account updated"));
  } catch (err) {
    dispatch(
      actionCreators.showErrorNotification("Account update failed", err)
    );
    dispatch(actionCreators.updateAccountFailed(err));
  }
};

export const showGlobalModal = modalConfig => dispatch => {
  dispatch(actionCreators.showGlobalModal(modalConfig));
};

export const hideGlobalModal = () => dispatch => {
  dispatch(actionCreators.hideGlobalModal());
};

export const importAccountStatement = (
  account: Account,
  statementFile: File
) => async dispatch => {
  dispatch(actionCreators.importAccountStatementRequested());
  try {
    const {
      numImported,
      numSkipped
    } = await transactionService.importAccountStatement(account, statementFile);
    dispatch(actionCreators.importAccountStatementSucceeded());
    dispatch(
      actionCreators.showSuccessNotification(
        "Statement import succeeded",
        `Imported: ${numImported}. Skipped ${numSkipped}`
      )
    );
  } catch (err) {
    dispatch(
      actionCreators.showErrorNotification("Statement import failed", err)
    );
    dispatch(actionCreators.importAccountStatementFailed(err));
  }
};

export const fetchTransactions = (options: FetchOptions) => async dispatch => {
  dispatch(actionCreators.fetchTransactionsRequested());
  try {
    const transactions = await transactionService.fetch(options);
    dispatch(actionCreators.fetchTransactionsSucceeded(transactions));
  } catch (err) {
    dispatch(
      actionCreators.showErrorNotification("Cannot fetch transactions", err)
    );
    dispatch(actionCreators.fetchTransactionsFailed(err));
  }
};

export const fetchCategories = () => async dispatch => {
  dispatch(actionCreators.fetchCategoriesRequested());
  try {
    const categories = await categoryService.fetch();
    dispatch(actionCreators.fetchCategoriesSucceeded(categories));
  } catch (err) {
    dispatch(
      actionCreators.showErrorNotification("Cannot fetch categories", err)
    );
    dispatch(actionCreators.fetchCategoriesFailed(err));
  }
};

export const seedCategories = () => async dispatch => {
  dispatch(actionCreators.seedCategoriesRequested());
  try {
    await seed(db);
    dispatch(actionCreators.seedCategoriesSucceeded());
  } catch (err) {
    dispatch(actionCreators.seedCategoriesFailed(err));
  }
};

export const updateTransactionCategory = (
  transactionId: string,
  previousCategoryId: string,
  categoryId: string
) => async dispatch => {
  dispatch(
    actionCreators.updateTransactionCategoryRequested(transactionId, categoryId)
  );
  try {
    await transactionService.updateCategory(transactionId, categoryId);
    dispatch(
      actionCreators.updateTransactionCategorySucceeded(
        transactionId,
        previousCategoryId,
        categoryId
      )
    );
  } catch (err) {
    dispatch(
      actionCreators.updateTransactionCategoryFailed(transactionId, categoryId)
    );
  }
};

export const changeDateRange = (dateRange: DateRange) => async dispatch => {
  dispatch(actionCreators.dateRangeChangedRequested());
  dispatch(actionCreators.dateRangeChangedSucceeded(dateRange));
};

export const changeTransactionPageDateRange = (
  dateRange: DateRange,
  location: Location
) => dispatch => {
  const newUrl = links.createTransactionLink(location, (queryParams) => {
    return {
      ...queryParams,
      "filters.dateFrom": dateRange.start.format("YYYY-MM-DD"),
      "filters.dateTo": dateRange.end.format("YYYY-MM-DD")
    }
  })
  dispatch(push(newUrl));
};

export const createSync = (sync: Sync) => dispatch => {
  try {
    syncService.create(sync);
    dispatch(actionCreators.createSyncSucceeded(sync));
  } catch (err) {
    dispatch(actionCreators.createSyncFailed(err));
  }
};

export const fetchSyncs = () => dispatch => {
  dispatch(actionCreators.fetchSyncsRequested());
  try {
    const syncs = syncService.fetch();
    dispatch(actionCreators.fetchSyncsSucceeded(syncs));
  } catch (err) {
    dispatch(actionCreators.fetchSyncFailed(err));
  }
};

export const deleteSync = (sync: Sync) => dispatch => {
  dispatch(actionCreators.deleteSyncRequested());
  try {
    syncService.del(sync);
    dispatch(actionCreators.deleteSyncSucceeded());
  } catch (error) {
    dispatch(actionCreators.deleteSyncFailed(error));
  }
};

export const startSync = (sync: Sync) => dispatch => {
  const syncState = syncService.start(sync);
  console.log(syncState);
  syncState
    .on("change", info => {
      console.log("changed");
      console.log(info);
    })
    .on("paused", err => {
      dispatch(actionCreators.syncPaused(sync, err));
    })
    .on("active", () => {
      console.log("active");
    })
    .on("denied", err => {
      dispatch(actionCreators.syncDenied(sync, err));
    })
    .on("complete", info => {
      console.log("complete");
      console.log(info);
    })
    .on("error", err => {
      dispatch(actionCreators.syncErrored(sync, err));
    })
    .catch((err) => {
      console.log(err);
    });

  dispatch(actionCreators.syncStarted(sync));
};

export const openLinkTransactionsDialog = (transaction: Transaction) => dispatch => {
  dispatch(actionCreators.openLinkTransactionsDialog(transaction));
};

export const closeLinkTransactionsDialog = () => dispatch => {
  dispatch(actionCreators.closeLinkTransactionsDialog());
}

export const fetchTransactionLinkCandidates = (transaction: Transaction) => async dispatch => {
  dispatch(actionCreators.fetchTransactionLinkCandidatesRequested());
  try {
    const candidates = await transactionService.fetchTransactionLinkCandidates(transaction);
    dispatch(actionCreators.fetchTransactionLinkCandidatesSucceeded(candidates));
  } catch (error) {
    dispatch(actionCreators.fetchTransactionLinkCandidatesFailed(error));
  }
}

export const linkTransactions = (transaction1: Transaction, transaction2: Transaction) => async dispatch => {
  dispatch(actionCreators.linkTransactionsRequested());
  try {
    await transactionService.linkTransactions(transaction1, transaction2);
    dispatch(actionCreators.linkTransactionsSucceeded(transaction1, transaction2));
    dispatch(actionCreators.showSuccessNotification("Successfully linked the transactions"));
  } catch (error) {
    dispatch(actionCreators.linkTransactionsFailed(error));
    dispatch(actionCreators.showErrorNotification("Cannot link the transactions", error));
  }
}

export const fetchIncomeExpensesStats = (filter: {dateFrom: string, dateTo: string}) => async dispatch => {
  dispatch(actionCreators.fetchIncomeExpensesStatsRequested());
  try {
    const stats = await transactionService.sumByType(filter);
    dispatch(actionCreators.fetchIncomeExpensesStatsSucceeded(stats));
  } catch (error) {
    dispatch(actionCreators.fetchIncomeExpensesStatsFailed(error));
  }
}

export const fetchCategorySummaries = (filter: {dateFrom: string, dateTo: string}) => async dispatch => {
  dispatch(actionCreators.fetchCategorySummariesRequested());
  try {
    const payload = await transactionService.sumByCategory(filter);
    dispatch(actionCreators.fetchCategorySummariesSucceeded(payload));
  } catch (error) {
    dispatch(actionCreators.fetchCategorySummariesFailed(error));
  }
}

export const changeShowAccountTransfers = (showAccountTransfers: boolean, location: Location) => dispatch => {
  const newUrl = links.createTransactionLink(location, (queryParams) => {
    return {
      ...queryParams,
      "filters.showAccountTransfers": showAccountTransfers,
      page: 1
    }
  });
  dispatch(push(newUrl));
};

export const changeShowOnlyUncategorized = (showOnlyUncategorized: boolean, location: Location) => dispatch => {
  const newUrl = links.createTransactionLink(location, (queryParams) => {
    return {
      ...queryParams,
      "filters.showOnlyUncategorized": showOnlyUncategorized,
      page: 1
    }
  });
  dispatch(push(newUrl));
};

export const fetchUncategorizedTransactionsCount = (filter: {dateFrom: string, dateTo: string}) => async dispatch => {
  dispatch(actionCreators.fetchUncategorizedTransactionCountRequested());
  try {
    const count = await transactionService.fetchUncategorizedTransactionsCount(filter);
    dispatch(actionCreators.fetchUncategorizedTransactionCountSucceeded(count));
  } catch (error) {
    dispatch(actionCreators.fetchUncategorizedTransactionCountFailed(error));
  }
}

export const changeAccountListGroupByOption = (groupBy: ?string) => dispatch => {
  dispatch(actionCreators.changeAccountListGroupByOptionSucceeded(groupBy));
}