import * as actionTypes from "../actions/types";

const initState = null;

export default (state = initState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ACCOUNT_BY_ID_SUCCEEDED:
      return action.account;
    case "@@redux-form/DESTROY":
      if (action.meta.form.indexOf("viewAccount") !== -1) {
        return initState;
      }
      return state;
    default:
      return state;
  }
};
