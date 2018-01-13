import * as actionTypes from "../actions/types";
import { thisMonth } from "../models/presetDateRanges";
import DateRange from "../models/DateRange";
import moment from "moment";
import * as queryString from "query-string";

const initState = {
  dateRange: thisMonth(),
  uncategorizedTransactionsCount: 0
};

export default (state = initState, action) => {
  switch (action.type) {
    case actionTypes.DATERANGE_CHANGE_SUCCEEDED:
      return {
        ...state,
        dateRange: action.dateRange
      };
    case actionTypes.FETCH_UNCATEGORIZED_TRANSACTION_COUNT_SUCCEEDED:
      return {
        ...state,
        uncategorizedTransactionsCount: action.count
      }
    case "@@router/LOCATION_CHANGE":
      // When the location change carries filters.dateFrom and filters.dateTo,
      // The dateRange state should be updated so we can show the correct date range
      // on the header bar
      const routerPayload = action.payload;
      const queryParams = queryString.parse(routerPayload.search);
      if (queryParams["filters.dateFrom"] && queryParams["filters.dateTo"]) {
        const dateFrom = queryParams["filters.dateFrom"];
        const dateTo =  queryParams["filters.dateTo"];
        const dateRange = new DateRange({
          start: moment(dateFrom),
          end: moment(dateTo)
        });
        return {
          ...state,
          dateRange
        }
      }
      return state;
    default:
      return state;
  }
};
