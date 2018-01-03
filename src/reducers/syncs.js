import * as actionTypes from "../actions/types";

const initState = {
  syncs: [],
  loading: false,
  failed: false
};

export default (state = initState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_SYNCS_REQUESTED:
      return {
        ...state,
        loading: true,
        failed: false
      };
    case actionTypes.FETCH_SYNCS_FAILED:
      return {
        ...state,
        loading: false,
        failed: true
      };
    case actionTypes.FETCH_SYNCS_SUCCEEDED:
      return {
        ...state,
        loading: false,
        failed: false,
        syncs: action.payload
      };
    default:
      return state;
  }
};
