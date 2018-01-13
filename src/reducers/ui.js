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
  statementImport: {
    loading: false
  },
  linkTransactions: {
    isOpen: false,
    transaction: null,
    candidates: []
  }
};

export default (state = initState, action) => {
  let accounts;
  switch (action.type) {
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
    case actionTypes.OPEN_LINK_TRANSACTIONS_DIALOG:
      return {
        ...state,
        linkTransactions: {
          ...state.linkTransactions,
          isOpen: true,
          transaction: action.transaction
        }
      };
    case actionTypes.CLOSE_LINK_TRANSACTIONS_DIALOG:
      return {
        ...state,
        linkTransactions: {
          ...state.linkTransactions,
          isOpen: false,
          transaction: null,
          candidates: []
        }
      };
    case actionTypes.FETCH_TRANSACTION_LINK_CANDIDATES_SUCCEEDED:
      return {
        ...state,
        linkTransactions: {
          ...state.linkTransactions,
          candidates: action.candidates
        }
      }
    default:
      return state;
  }
};
