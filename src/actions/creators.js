import * as actionTypes from "./types";
import { success, error } from "react-notification-system-redux";
import Account from "../models/Account";
import Sync from "../models/Sync";

const actionFailed = (actionType: string) => {
  return error => {
    return {
      type: actionType,
      error
    };
  };
};

export const showSuccessNotification = (title: string, message = "") => {
  return success({
    title,
    message,
    autoDismiss: 5
  });
};

export const showErrorNotification = (msg, err) => {
  return error({
    title: msg,
    message: `${err.toString()}`,
    autoDismiss: 0
  });
};

export const showGlobalModal = modalConfig => {
  // For available modalConfig keys see reducers/ui.js
  // TODO: extract modalConfig as a class
  return {
    type: actionTypes.SHOW_GLOBAL_MODAL,
    config: modalConfig
  };
};

export const hideGlobalModal = () => {
  return {
    type: actionTypes.HIDE_GLOBAL_MODAL
  };
};

export const fetchAccountsRequested = () => {
  return {
    type: actionTypes.FETCH_ACCOUNTS_REQUESTED
  };
};

export const fetchAccountsSucceeded = payload => {
  return {
    type: actionTypes.FETCH_ACCOUNTS_SUCCEEDED,
    payload
  };
};

export const fetchAccountsFailed = actionFailed(
  actionTypes.FETCH_ACCOUNTS_FAILED
);

export const deleteAccountRequested = accountId => {
  return {
    type: actionTypes.DELETE_ACCOUNT_REQUESTED,
    accountId
  };
};

export const deleteAccountSucceeded = accountId => {
  return {
    type: actionTypes.DELETE_ACCOUNT_SUCCEEDED,
    accountId
  };
};

export const deleteAccountFailed = actionFailed(
  actionTypes.DELETE_ACCOUNT_FAILED
);

export const createAccountSucceeded = account => {
  return {
    type: actionTypes.CREATE_ACCOUNT_SUCCEEDED,
    account
  };
};

export const createAccountFailed = actionFailed(
  actionTypes.CREATE_ACCOUNT_FAILED
);

export const fetchAccountByIdSucceeded = account => {
  return {
    type: actionTypes.FETCH_ACCOUNT_BY_ID_SUCCEEDED,
    account
  };
};

export const updateAccountSucceeded = (account: Account) => {
  return {
    type: actionTypes.UPDATE_ACCOUNT_SUCCEEDED,
    account
  };
};

export const updateAccountFailed = actionFailed(
  actionTypes.UPDATE_ACCOUNT_FAILED
);

export const importAccountStatementRequested = () => {
  return {
    type: actionTypes.IMPORT_ACCOUNT_STATEMENT_REQUESTED
  };
};

export const importAccountStatementSucceeded = () => {
  return {
    type: actionTypes.IMPORT_ACCOUNT_STATEMENT_SUCCEEDED
  };
};

export const importAccountStatementFailed = actionFailed(
  actionTypes.IMPORT_ACCOUNT_STATEMENT_FAILED
);

export const fetchTransactionsSucceeded = (payload: Array<Transaction>) => {
  return {
    type: actionTypes.FETCH_TRANSACTIONS_SUCCEEDED,
    payload
  };
};

export const fetchTransactionsRequested = () => {
  return {
    type: actionTypes.FETCH_TRANSACTIONS_REQUESTED
  };
};

export const fetchTransactionsFailed = actionFailed(
  actionTypes.FETCH_TRANSACTIONS_FAILED
);

export const fetchCategoriesSucceeded = (payload: Array<Category>) => {
  return {
    type: actionTypes.FETCH_CATEGORIES_SUCCEEDED,
    payload
  };
};

export const fetchCategoriesRequested = () => {
  return {
    type: actionTypes.FETCH_CATEGORIES_REQUESTED
  };
};

export const fetchCategoriesFailed = actionFailed(
  actionTypes.FETCH_CATEGORIES_FAILED
);

export const seedCategoriesRequested = () => {
  return {
    type: actionTypes.SEED_CATEGORIES_REQUESTED
  };
};

export const seedCategoriesSucceeded = () => {
  return {
    type: actionTypes.SEED_CATEGORIES_SUCCEEDED
  };
};

export const seedCategoriesFailed = actionFailed(
  actionTypes.SEED_CATEGORIES_FAILED
);

export const createCategoryRequested = () => {
  return {
    type: actionTypes.CREATE_CATEGORY_REQUESTED
  }
}

export const createCategorySucceeded = (category: Category) => {
  return {
    type: actionTypes.CREATE_CATEGORY_SUCCEEDED,
    category
  }
}

export const createCategoryFailed = actionFailed(actionTypes.CREATE_CATEGORY_FAILED);

export const updateCategoryRequested = () => {
  return {
    type: actionTypes.UPDATE_CATEGORY_REQUESTED
  }
}

export const changeCategoryFilters = (categoryFilters) => {
  return {
    type: actionTypes.CHANGE_CATEGORY_FILTERS,
    categoryFilters
  }
}

export const updateCategorySucceeded = (category: Category) => {
  return {
    type: actionTypes.UPDATE_CATEGORY_SUCCEEDED,
    category
  }
}

export const updateCategoryFailed = actionFailed(actionTypes.UPDATE_CATEGORY_FAILED);

export const deleteCategoryRequested = () => {
  return {
    type: actionTypes.DELETE_CATEGORY_REQUESTED
  }
}

export const deleteCategorySucceeded = (categoryId) => {
  return {
    type: actionTypes.DELETE_CATEGORY_SUCCEEDED,
    categoryId
  }
}

export const deleteCategoryFailed = actionFailed(actionTypes.DELETE_CATEGORY_FAILED);

export const updateTransactionCategoryRequested = (
  transactionId: string,
  categoryId: string
) => {
  return {
    type: actionTypes.UPDATE_TRANSACTION_CATEGORY_REQUESTED,
    transactionId,
    categoryId
  };
};

export const updateTransactionCategorySucceeded = (
  transactionId: string,
  previousCategoryId,
  categoryId: string
) => {
  return {
    type: actionTypes.UPDATE_TRANSACTION_CATEGORY_SUCCEEDED,
    transactionId,
    previousCategoryId,
    categoryId
  };
};

export const updateTransactionCategoryFailed = (
  transactionId: string,
  categoryId: string
) => {
  return {
    type: actionTypes.UPDATE_TRANSACTION_CATEGORY_FAILED,
    transactionId,
    categoryId
  };
};

export const dateRangeChangedRequested = () => {
  return {
    type: actionTypes.DATERANGE_CHANGE_REQUESTED
  };
};

export const dateRangeChangedSucceeded = dateRange => {
  return {
    type: actionTypes.DATERANGE_CHANGE_SUCCEEDED,
    dateRange
  };
};

export const fetchSyncsRequested = () => {
  return {
    type: actionTypes.FETCH_SYNCS_REQUESTED
  };
};

export const fetchSyncsSucceeded = (payload: Array<Sync>) => {
  return {
    type: actionTypes.FETCH_SYNCS_SUCCEEDED,
    payload
  };
};

export const fetchSyncFailed = actionFailed(actionTypes.FETCH_SYNCS_FAILED);

export const createSyncSucceeded = (sync: Sync) => {
  return {
    type: actionTypes.CREATE_SYNC_SUCCEEDED,
    sync
  };
};

export const createSyncFailed = actionFailed(actionTypes.CREATE_SYNC_FAILED);

export const deleteSyncRequested = () => {
  return {
    type: actionTypes.DELETE_SYNC_REQUESTED
  };
};

export const deleteSyncSucceeded = () => {
  return {
    type: actionTypes.DELETE_SYNC_SUCCEEDED
  };
};

export const deleteSyncFailed = actionFailed(actionTypes.DELETE_SYNC_FAILED);

export const syncStarted = (sync: Sync) => {
  return {
    type: actionTypes.SYNC_STARTED,
    sync
  };
};

export const syncPaused = (sync: Sync, error) => {
  return {
    type: actionTypes.SYNC_PAUSED,
    sync,
    error
  };
};

export const syncDenied = (sync: Sync, error) => {
  return {
    type: actionTypes.SYNC_DENIED,
    sync,
    error
  };
};

export const syncErrored = (sync: Sync, error) => {
  return {
    type: actionTypes.SYNC_ERRORED,
    sync,
    error
  };
};

export const openLinkTransactionsDialog = (transaction: Transaction) => {
  return {
    type: actionTypes.OPEN_LINK_TRANSACTIONS_DIALOG,
    transaction
  };
};

export const closeLinkTransactionsDialog = () => {
  return {
    type: actionTypes.CLOSE_LINK_TRANSACTIONS_DIALOG
  };
};

export const fetchTransactionLinkCandidatesRequested = () => {
  return {
    type: actionTypes.FETCH_TRANSACTION_LINK_CANDIDATES_REQUESTED
  };
};

export const fetchTransactionLinkCandidatesSucceeded = (
  candidates: Array<Transaction>
) => {
  return {
    type: actionTypes.FETCH_TRANSACTION_LINK_CANDIDATES_SUCCEEDED,
    candidates
  };
};

export const fetchTransactionLinkCandidatesFailed = actionFailed(
  actionTypes.FETCH_TRANSACTION_LINK_CANDIDATES_FAILED
);

export const linkTransactionsRequested = () => {
  return {
    type: actionTypes.LINK_TRANSACTIONS_REQUESTED
  };
};

export const linkTransactionsSucceeded = (
  transaction1: Transaction,
  transaction2: Transaction
) => {
  return {
    type: actionTypes.LINK_TRANSACTIONS_SUCCEEDED,
    transaction1,
    transaction2
  };
};

export const linkTransactionsFailed = actionFailed(
  actionTypes.LINK_TRANSACTIONS_FAILED
);

export const fetchIncomeExpensesStatsRequested = () => {
  return {
    type: actionTypes.FETCH_INCOME_EXPENSES_STATS_REQUESTED
  };
};

export const fetchIncomeExpensesStatsSucceeded = payload => {
  return {
    type: actionTypes.FETCH_INCOME_EXPENSES_STATS_SUCCEEDED,
    payload
  };
};

export const fetchIncomeExpensesStatsFailed = actionFailed(
  actionTypes.FETCH_INCOME_EXPENSES_STATS_FAILED
);

export const fetchCategorySummariesRequested = () => {
  return {
    type: actionTypes.FETCH_CATEGORY_SUMMARIES_REQUESTED
  };
}

export const fetchCategorySummariesSucceeded = (payload) => {
  return {
    type: actionTypes.FETCH_CATEGORY_SUMMARIES_SUCCEEDED,
    payload
  };
}

export const fetchCategorySummariesFailed = actionFailed(actionTypes.FETCH_CATEGORY_SUMMARIES_FAILED);

export const fetchUncategorizedTransactionCountRequested = () => {
  return {
    type: actionTypes.FETCH_UNCATEGORIZED_TRANSACTION_COUNT_REQUESTED
  }
}

export const fetchUncategorizedTransactionCountSucceeded = (count: Number) => {
  return {
    type: actionTypes.FETCH_UNCATEGORIZED_TRANSACTION_COUNT_SUCCEEDED,
    count
  }
}

export const fetchUncategorizedTransactionCountFailed = actionFailed(actionTypes.FETCH_UNCATEGORIZED_TRANSACTION_COUNT_FAILED);

export const changeAccountListGroupByOptionSucceeded = (groupBy) => {
  return {
    type: actionTypes.CHANGE_ACCOUNT_LIST_GROUP_BY_OPTION_SUCCEEDED,
    groupBy
  }
}