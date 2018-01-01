import * as actionTypes from "./types";
import { success, error } from "react-notification-system-redux";
import Account from "../models/Account";

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

export const fetchAccountsFailed = error => {
  return {
    type: actionTypes.FETCH_ACCOUNTS_FAILED,
    error
  };
};

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

export const deleteAccountFailed = error => {
  return {
    type: actionTypes.DELETE_ACCOUNT_FAILED,
    error
  };
};

export const createAccountSucceeded = account => {
  return {
    type: actionTypes.CREATE_ACCOUNT_SUCCEEDED,
    account
  };
};

export const createAccountFailed = error => {
  return {
    type: actionTypes.CREATE_ACCOUNT_FAILED,
    error
  };
};

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

export const updateAccountFailed = () => {
  return {
    type: actionTypes.UPDATE_ACCOUNT_FAILED,
    error
  };
};

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

export const importAccountStatementFailed = error => {
  return {
    type: actionTypes.IMPORT_ACCOUNT_STATEMENT_FAILED,
    error
  };
};

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

export const fetchTransactionsFailed = error => {
  return {
    type: actionTypes.FETCH_TRANSACTIONS_FAILED,
    error
  };
};

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

export const fetchCategoriesFailed = error => {
  return {
    type: actionTypes.FETCH_CATEGORIES_FAILED,
    error
  };
};

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
  categoryId: string
) => {
  return {
    type: actionTypes.UPDATE_TRANSACTION_CATEGORY_SUCCEEDED,
    transactionId,
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

export const dateRangeChangedSucceeded = (dateRange) => {
  return {
    type: actionTypes.DATERANGE_CHANGE_SUCCEEDED,
    dateRange
  }
}