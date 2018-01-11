// @flow
import * as queryString from "query-string";

export const createTransactionLink = (currentLocation: Location, queryParamReducer: ({}) => {}) => {
  const queryParams = queryString.parse(currentLocation.search || "");
  const newQueryParams = queryParamReducer(queryParams);
  return `${currentLocation.pathname}?${queryString.stringify(newQueryParams)}`;
}