import reducer from "./transactions";
import * as actionCreators from "../actions/creators";
import Transaction from "../models/Transaction";
import { defaultFetchOptions } from "../services/transactionService";

describe("transactions reducer", () => {
  it("should update transaction's category when category is updated", () => {
    const transactions = [
      new Transaction({ _id: "txn1", categoryId: "test" }),
      new Transaction({ _id: "txn2", categoryId: "test" }),
      new Transaction({ _id: "txn3", categoryId: "test" })
    ];
    const state = {
      transactions,
      total: 0,
      loading: false,
      failed: false
    };
    const newState = reducer(
      state,
      actionCreators.updateTransactionCategorySucceeded("txn2", "category1")
    );
    expect(newState.transactions[0].categoryId).toEqual("test");
    expect(newState.transactions[1].categoryId).toEqual("category1");
    expect(newState.transactions[2].categoryId).toEqual("test");
  });

  it("should update the total number of transactions", () => {
    const transactions = [];
    const state = {
      transactions,
      total: 0,
      loading: false,
      failed: false
    };
    const payload = {
      result: [new Transaction({ _id: "txn1", categoryId: "test" })],
      total: 10
    };
    const newState = reducer(
      state,
      actionCreators.fetchTransactionsSucceeded(payload)
    );
    expect(newState.transactions.length).toEqual(1);
    expect(newState.total).toEqual(10);
  });

  it("should set to default fetch options when no query params", () => {
    const state = {
      fetchOptions: defaultFetchOptions
    };

    const action = {
      type: "@@router/LOCATION_CHANGE",
      payload: {
        pathname: "/transactions",
        search: ""
      }
    };

    const newState = reducer(state, action);
    expect(newState.fetchOptions).toEqual(defaultFetchOptions);
  });

  it("should set to showAccountTransfers to true when it's set in the query params", () => {
    const state = {
      fetchOptions: {
        pagination: {
          page: 1
        },
        filters: {
          dateFrom: "2017-01-01",
          dateTo: "2017-02-01"
        }
      }
    };

    const action = {
      type: "@@router/LOCATION_CHANGE",
      payload: {
        pathname: "/transactions",
        search: "?page=5&filters.showAccountTransfers=true"
      }
    };

    const newState = reducer(state, action);
    expect(newState.fetchOptions.filters.showAccountTransfers).toEqual(true);
    expect(newState.fetchOptions.pagination.page).toEqual(5);
    expect(newState.fetchOptions.filters.dateFrom).toEqual(
      defaultFetchOptions.filters.dateFrom
    );
    expect(newState.fetchOptions.filters.dateTo).toEqual(
      defaultFetchOptions.filters.dateTo
    );
  });
});
