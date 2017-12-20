import * as actionTypes from "../actions/types";

const initState = [];

export default (state = initState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ACCOUNTS_SUCCEEDED:
      return action.payload;
    case actionTypes.DELETE_ACCOUNT_SUCCEEDED:
      return state.filter(account => account.id != action.accountId);
    default:
      return state;
  }
};
