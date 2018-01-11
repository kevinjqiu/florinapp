// @flow
import * as queryString from "query-string";
import { defaultFetchOptions } from "../services/transactionService";

export const createTransactionLink = (currentLocation: Location, queryParamReducer: ({}) => {}) => {
  const queryParams = queryString.parse(currentLocation.search || "");
  const newQueryParams = queryParamReducer(queryParams);
  return `${currentLocation.pathname}?${queryString.stringify(newQueryParams)}`;
}