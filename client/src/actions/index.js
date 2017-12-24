import axios from "axios";
import { push } from "react-router-redux";
import * as actionCreators from "./creators";

export const fetchAccounts = () => async dispatch => {
  dispatch(actionCreators.fetchAccountsRequested());
  try {
    const response = await axios.get("/api/v2/accounts");
    return dispatch(
      actionCreators.fetchAccountsSucceeded(response.data.result)
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
    const response = await axios.post(`/api/v2/accounts`, accountData);
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

export const showGlobalModal = modalConfig => dispatch => {
  dispatch(actionCreators.showGlobalModal(modalConfig));
};

export const hideGlobalModal = () => dispatch => {
  dispatch(actionCreators.hideGlobalModal());
};
