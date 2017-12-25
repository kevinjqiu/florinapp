import { FlushThunks, Thunk } from "redux-testkit";
import { createStore, applyMiddleware } from "redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import db from "../db";
import reset from "../db/reset";
import * as actionCreators from "./creators";
import * as actionTypes from "./types";
import * as actions from "./index";
import Account from "../models/Account";
import reducer from "../reducers";

const mockStore = configureMockStore([thunk]);

describe("Fetch accounts", () => {
  let flushThunks, store;

  beforeEach(() => {
    reset();
    flushThunks = FlushThunks.createMiddleware();
    store = createStore(reducer, applyMiddleware(flushThunks, thunk));
  });

  it("should set state to empty accounts when no accounts are loaded", async () => {
    await store.dispatch(actions.fetchAccounts());
    const { accounts } = store.getState();
    expect(accounts.length).toBe(0);
  });

  it("should load the accounts", async () => {
    await db.post(new Account({name: "TEST", financialInstitution: "TEST_FI", type: "CHECKING"}));
    await store.dispatch(actions.fetchAccounts());
    const { accounts } = store.getState();
    expect(accounts.length).toBe(1);
    expect(accounts[0].name).toEqual("TEST");
    expect(accounts[0].financialInstitution).toEqual("TEST_FI");
    expect(accounts[0].type).toEqual("CHECKING");
  })

});