import * as actionTypes from "./types";

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
