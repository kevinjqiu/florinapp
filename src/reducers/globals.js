import * as actionTypes from "../actions/types";
import { thisMonth } from "../models/presetDateRanges";

const initState = {
  dateRange: thisMonth()
};

export default (state = initState, action) => {
  switch (action.type) {
    case actionTypes.DATERANGE_CHANGE_SUCCEEDED:
      return {
        ...state,
        dateRange: action.dateRange
      };
    default:
      return state;
  }
};
