import reducer from "./accounts";
import Account from "../models/Account";
import * as actionCreators from "../actions/creators";

describe("accounts reducer", () => {
  it("should be set to the payload when fetch accounts succeeded", () => {
    const state = {
      accounts: [{ name: "BAR", financialInstitution: "BNG" }],
      loading: false,
      failed: false
    };
    const newState = reducer(
      state,
      actionCreators.fetchAccountsSucceeded([
        { name: "FOO", financialInstitution: "Tang" }
      ])
    );
    expect(newState.accounts).toEqual([{ name: "FOO", financialInstitution: "Tang" }]);
  });

  it("should set loading to true when fetch accounts requested", () => {
    const state = {
      accounts: [],
      loading: false,
      failed: true,
    }
    const newState = reducer(
      state,
      actionCreators.fetchAccountsRequested()
    );
    expect(newState.loading).toEqual(true);
    expect(newState.failed).toEqual(false);
  });

  it("should set failed to true when fetch accounts failed", () => {
    const state = {
      accounts: [],
      loading: true,
      failed: false
    };
    const newState = reducer(state, actionCreators.fetchAccountsFailed());
    expect(newState.loading).toEqual(false);
    expect(newState.failed).toEqual(true);
  });

  it("should delete account from the state", () => {
    const state = {
      accounts: [
        { id: "FOO", name: "FOO", financialInstitution: "FI1" },
        { id: "BAR", name: "BAR", financialInstitution: "FI2" }
      ],
      loading: false,
      failed: false
    };

    const newState = reducer(
      state,
      actionCreators.deleteAccountSucceeded("FOO")
    );

    expect(newState.accounts).toEqual([
      { id: "BAR", name: "BAR", financialInstitution: "FI2" }
    ]);
  });

  it("should change account list groupby option", () => {
    const state = {
      uiOptions: { groupBy: "financialInstitution" }
    }
    const newState = reducer(state, actionCreators.changeAccountListGroupByOptionSucceeded("type"));
    expect(newState.uiOptions.groupBy).toEqual("type");
  })

  it("should update account", () => {
    const a1 = new Account({_id: "a1", name: "A1"})
    const a2 = new Account({_id: "a2", name: "A2"})
    const a3 = new Account({_id: "a3", name: "A3"})
    const a2p = new Account({_id: "a2", name: "AAA222"})

    const state = {
      accounts: [a1, a2, a3]
    }

    const newState = reducer(state, actionCreators.updateAccountSucceeded(a2p))
    expect(newState.accounts).toEqual([a1, a2p, a3])
  })
});
