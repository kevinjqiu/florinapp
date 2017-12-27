import reducer from "./accounts";
import * as actionCreators from "../actions/creators";

describe("accounts reducer", () => {
  it("should be set to the payload when fetch accounts succeeded", () => {
    const state = [{ name: "BAR", financialInstitution: "BNG" }];
    const newState = reducer(
      state,
      actionCreators.fetchAccountsSucceeded([
        { name: "FOO", financialInstitution: "Tang" }
      ])
    );
    expect(newState).toEqual([{ name: "FOO", financialInstitution: "Tang" }]);
  });

  it("should delete account from the state", () => {
    const state = [
      { id: "FOO", name: "FOO", financialInstitution: "FI1" },
      { id: "BAR", name: "BAR", financialInstitution: "FI2" }
    ];

    const newState = reducer(
      state,
      actionCreators.deleteAccountSucceeded("FOO")
    );

    expect(newState).toEqual([
      { id: "BAR", name: "BAR", financialInstitution: "FI2" }
    ]);
  });
});
