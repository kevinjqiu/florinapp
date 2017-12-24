import * as actionTypes from "../actions/types";

const initState = null;

export default (state = initState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ACCOUNT_BY_ID_SUCCEEDED:
      return action.account;
    default:
      return state;
  }
};
