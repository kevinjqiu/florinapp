// @flow
import * as actionTypes from "../actions/types";

const initState = {
  settings: null
}

export default (state = initState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_SETTINGS_SUCCEEDED:
      return {
        ...state,
        settings: action.settings
      }
    default:
      return state;
  }
};