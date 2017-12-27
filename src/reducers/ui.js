import * as actionTypes from "../actions/types";

const initState = {
  global: {},
  globalModal: {
    isOpen: false,
    title: null,
    body: null,
    positiveActionLabel: null,
    positiveAction: () => {},
    negativeActionLabel: null
  },
  accounts: {
    loading: false,
    failed: false
  },
  statementImport: {
    loading: false
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
    case actionTypes.SHOW_GLOBAL_MODAL:
      return {
        ...state,
        globalModal: {
          ...action.config,
          isOpen: true
        }
      };
    case actionTypes.HIDE_GLOBAL_MODAL:
      return {
        ...state,
        globalModal: {
          ...initState.globalModal,
          isOpen: false
        }
      };
    case actionTypes.IMPORT_ACCOUNT_STATEMENT_REQUESTED:
      return {
        ...state,
        statementImport: {
          ...state.statementImport,
          loading: true
        }
      };
    case actionTypes.IMPORT_ACCOUNT_STATEMENT_SUCCEEDED:
      return {
        ...state,
        statementImport: {
          ...state.statementImport,
          loading: false
        }
      };
    case actionTypes.IMPORT_ACCOUNT_STATEMENT_FAILED:
      return {
        ...state,
        statementImport: {
          ...state.statementImport,
          loading: false
        }
      };
    default:
      return state;
  }
};
