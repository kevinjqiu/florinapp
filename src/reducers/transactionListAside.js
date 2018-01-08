import * as actionTypes from "../actions/types";

const initState = {
  incomeExpensesStats: null
};

export default (state = initState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_INCOME_EXPENSES_STATS_SUCCEEDED:
      return {
        ...state,
        incomeExpensesStats: action.payload
      };
    default:
      return state;
  }
};
