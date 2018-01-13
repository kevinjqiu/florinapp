import * as actionTypes from "../actions/types";

const initState = {
  accounts: [],
  loading: false,
  failed: false
};

export default (state = initState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ACCOUNTS_SUCCEEDED:
      return {
        ...state,
        accounts: action.payload,
        loading: false,
        failed: false
      }
    case actionTypes.FETCH_ACCOUNTS_REQUESTED:
      return {
        ...state,
        loading: true,
        failed: false
      }
    case actionTypes.FETCH_ACCOUNTS_FAILED:
      return {
        ...state,
        failed: true
      }
    case actionTypes.DELETE_ACCOUNT_SUCCEEDED:
      return {
        ...state,
        accounts: state.accounts.filter(account => account.id !== action.accountId),
      }
    case actionTypes.UPDATE_ACCOUNT_SUCCEEDED:
      let account = action.account;
      const newAccounts = [];
      state.accounts.forEach(a => {
        if (a._id !== account._id) {
          newAccounts.push(a);
        } else {
          newAccounts.push(account);
        }
      })
      return {
        ...state,
        accounts: newAccounts
      }
    default:
      return state;
  }
};
