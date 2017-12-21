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
  }
};

export default (state = initState, action) => {
  let accounts, globalModal;
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
      globalModal = state.globalModal;
      return {
        ...state,
        globalModal: {
          ...action.config,
          isOpen: true
        }
      };
    case actionTypes.HIDE_GLOBAL_MODAL:
      globalModal = state.globalModal;
      return {
        ...state,
        globalModal: {
          ...initState.globalModal,
          isOpen: false
        }
      };
    default:
      return state;
  }
};
