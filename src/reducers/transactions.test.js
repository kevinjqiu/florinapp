import reducer from "./transactions";
import * as actionCreators from "../actions/creators";
import Transaction from "../models/Transaction";

describe("transactions reducer", () => {
  it("should update transaction's category when category is updated", async () => {
    const transactions = [
      new Transaction({_id: "txn1", categoryId: "test"}),
      new Transaction({_id: "txn2", categoryId: "test"}),
      new Transaction({_id: "txn3", categoryId: "test"})
    ];
    const state = {
      transactions,
      loading: false,
      failed: false
    };
    const newState = reducer(state, actionCreators.updateTransactionCategorySucceeded("txn2", "category1"));
    expect(newState.transactions[0].categoryId).toEqual("test");
    expect(newState.transactions[1].categoryId).toEqual("category1");
    expect(newState.transactions[2].categoryId).toEqual("test");
  });
})