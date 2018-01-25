import reducer from "./aside";

describe("aside reducer", () => {
  it("should set to transaction list aside when location is transaction", () => {
    const state = { asideType: null };
    const newState = reducer(state, {
      type: "@@router/LOCATION_CHANGE",
      payload: {
        pathname: "/transactions"
      }
    });
    expect(newState.asideType).toEqual("TransactionListAside");
  });

  it("should not set to transaction list aside when location doesn't match", () => {
    const state = { asideType: null };
    const newState = reducer(state, {
      type: "@@router/LOCATION_CHANGE",
      payload: {
        pathname: "/accounts"
      }
    });
    expect(newState.asideType).toEqual(null);
  })
});
