import axios from "axios";
import * as actionTypes from "./types";
import * as actionCreators from "./creators";

export const fetchAccounts = () => async dispatch => {
  dispatch(actionCreators.fetchAccountsRequested());
  try {
    const response = await axios.get("/api/v2/accounts");
    return dispatch(
      actionCreators.fetchAccountsSucceeded(response.data.result)
    );
  } catch (err) {
    dispatch(actionCreators.fetchAccountsFailed(err));
  }
};
