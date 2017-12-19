import * as actionTypes from "../actions/types";

const initState = {
  global: {},
  accounts: {
    loading: false,
    failed: false
  }
};

export default (state = initState, action) => {
  let accounts;
  switch (action.type) {
    case actionTypes.FETCH_ACCOUNTS_REQUESTED:
      accounts = state.accounts;
      return {
        ...state,
        accounts: { ...accounts, loading: true, failed: false }
      };
    case actionTypes.FETCH_ACCOUNTS_SUCCEEDED:
      accounts = state.accounts;
      return {
        ...state,
        accounts: { ...accounts, loading: false, failed: false }
      };
    case actionTypes.FETCH_ACCOUNTS_FAILED:
      accounts = state.accounts;
      return {
        ...state,
        accounts: { ...accounts, failed: true }
      };
    default:
      return state;
  }
};
