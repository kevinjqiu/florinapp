import axios from "axios";
import { push } from "react-router-redux";
import * as actionCreators from "./creators";
import { db } from "../db";

export const fetchAccounts = () => async dispatch => {
  dispatch(actionCreators.fetchAccountsRequested());
  try {
    const response = await db.allDocs({include_docs: true});
    return dispatch(
      actionCreators.fetchAccountsSucceeded(response.rows.map(r => r.doc))
    );
  } catch (err) {
    dispatch(
      actionCreators.showErrorNotification("Cannot fetch accounts", err)
    );
    dispatch(actionCreators.fetchAccountsFailed(err));
  }
};

export const deleteAccount = accountId => async dispatch => {
  dispatch(actionCreators.deleteAccountRequested(accountId));
  try {
    await axios.delete(`/api/v2/accounts/${accountId}`);
    dispatch(actionCreators.showSuccessNotification("The account was deleted"));
    dispatch(actionCreators.deleteAccountSucceeded(accountId));
  } catch (err) {
    dispatch(
      actionCreators.showErrorNotification("Cannot delete account", err)
    );
    dispatch(actionCreators.deleteAccountFailed(err));
  }
};

export const createAccount = accountData => async dispatch => {
  try {
    const doc = {
      metadata: {
        type: "Account"
      },
      ...accountData
    }
    const response = await db.post(doc);
    console.log(response);
    dispatch(actionCreators.createAccountSucceeded(response.account));
    dispatch(push("/accounts"));
    dispatch(actionCreators.showSuccessNotification("Account created"));
  } catch (err) {
    dispatch(actionCreators.showErrorNotification("Account creation failed", err));
    dispatch(actionCreators.createAccountFailed(err));
  }
};

export const fetchAccountById = accountId => async dispatch => {
  try {
    const response = await axios.get(`/api/v2/accounts/${accountId}`);
    dispatch(actionCreators.fetchAccountByIdSucceeded(response.data.result));
  } catch (err) {
    dispatch(actionCreators.showErrorNotification("Failed to get account", err));
  }
};

export const updateAccount = (accountId, accountData) => async dispatch => {
  try {
    await axios.put(`/api/v2/accounts/${accountId}`, accountData);
    dispatch(actionCreators.updateAccountSucceeded());
    dispatch(push("/accounts"));
    dispatch(actionCreators.showSuccessNotification("Account updated"));
  } catch (err) {
    dispatch(actionCreators.showErrorNotification("Account update failed", err));
    dispatch(actionCreators.updateAccountFailed(err));
  }
};

export const showGlobalModal = modalConfig => dispatch => {
  dispatch(actionCreators.showGlobalModal(modalConfig));
};

export const hideGlobalModal = () => dispatch => {
  dispatch(actionCreators.hideGlobalModal());
};
