import * as actionTypes from "../actions/types";

const initState = {
  transactions: [],
  loading: false,
  failed: false
};

export default (state = initState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_TRANSACTIONS_SUCCEEDED:
      return {
        ...state,
        transactions: action.payload,
        loading: false,
        failed: false
      };
    case actionTypes.FETCH_TRANSACTIONS_REQUESTED:
      return {
        ...state,
        loading: true,
        failed: false
      };
    case actionTypes.FETCH_TRANSACTIONS_FAILED:
      return {
        ...state,
        loading: false,
        failed: true
      };
  }
};
