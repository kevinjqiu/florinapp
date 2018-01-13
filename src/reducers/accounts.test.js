import reducer from "./accounts";
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
});
