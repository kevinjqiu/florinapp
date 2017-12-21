import axios from "axios";
import * as actionCreators from "./creators";

export const fetchAccounts = () => async dispatch => {
  dispatch(actionCreators.fetchAccountsRequested());
  try {
    const response = await axios.get("/api/v2/accounts");
    return dispatch(
      actionCreators.fetchAccountsSucceeded(response.data.result)
    );
  } catch (err) {
    dispatch(actionCreators.showErrorNotification("Cannot fetch accounts", err));
    dispatch(actionCreators.fetchAccountsFailed(err));
  }
};

export const deleteAccount = (accountId) => async dispatch => {
  dispatch(actionCreators.deleteAccountRequested());
  try {
    await axios.delete(`/api/v2/accounts/${accountId}`);
    return dispatch(
      actionCreators.deleteAccountSucceeded()
    );
  } catch (err) {
    dispatch(actionCreators.showErrorNotification("Cannot delete account", err));
    dispatch(actionCreators.deleteAccountFailed(err));
  }
}

export const showGlobalModal = (modalConfig) => dispatch => {
  dispatch(actionCreators.showGlobalModal(modalConfig));
}

export const hideGlobalModal = () => dispatch => {
  dispatch(actionCreators.hideGlobalModal());
}