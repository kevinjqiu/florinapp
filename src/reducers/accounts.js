import * as actionTypes from "../actions/types";

const initState = [];

export default (state = initState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ACCOUNTS_SUCCEEDED:
      return action.payload;
    case actionTypes.DELETE_ACCOUNT_SUCCEEDED:
      return state.filter(account => account.id !== action.accountId);
    case actionTypes.UPDATE_ACCOUNT_SUCCEEDED:
      let account = action.account;
      const newState = [];
      state.forEach(a => {
        if (a._id !== account._id) {
          newState.push(a);
        } else {
          newState.push(account);
        }
      })
      return newState;
    default:
      return state;
  }
};
