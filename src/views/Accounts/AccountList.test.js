import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { configure, mount, shallow } from "enzyme";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import Adapter from "enzyme-adapter-react-16";
import AccountList from "./AccountList";
import * as actionCreators from "../../actions/creators";
import * as actionTypes from "../../actions/types";
import { deleteAccount } from "../../actions/index";
import db from "../../db";
import reset from "../../db/reset";

configure({ adapter: new Adapter() });
const mockStore = configureMockStore([thunk]);

describe("Account List", async () => {
  beforeEach(async () => {
    await reset();
  });
  let store;

  it("should show 'no existing accounts' and the create account button when no accounts", () => {
    store = mockStore({ accounts: { accounts: [] } });
    const wrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <AccountList />
        </BrowserRouter>
      </Provider>
    );
    expect(wrapper.text()).toContain(
      "There are currently no existing accounts."
    );
    expect(wrapper.find("NewAccountButton").length).toBe(2);
  });

  it("should populate accounts table with accounts from stored accounts", () => {
    const accounts = [
      {
        _id: "abcdefghijk",
        name: "Awesome Account",
        financialInstitution: "Awesome Bank",
        type: "CHECKING",
        currency: "CAD"
      },
      {
        _id: "cafebabe123",
        name: "Another Account",
        financialInstitution: "Another Bank",
        type: "CREDIT_CARD",
        currency: "CAD"
      }
    ];
    store = mockStore({ accounts: { accounts, uiOptions: { groupBy: null } } });
    const wrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <AccountList />
        </BrowserRouter>
      </Provider>
    );
    expect(wrapper.find("tbody").find("tr").length).toBe(accounts.length);
    wrapper
      .find("tbody")
      .find("tr")
      .forEach((tr, idx) => {
        const tds = tr.find("td");
        const links = tds.at(0).find("Link");
        expect(links.length).toBe(1);
        expect(links.at(0).prop("to")).toEqual(
          `/accounts/${accounts[idx]._id}/view`
        );
        expect(tds.at(2).text()).toEqual(accounts[idx].financialInstitution);
        expect(tds.at(3).text()).toEqual(accounts[idx].currency);
        expect(tds.at(4).text()).toEqual(accounts[idx].type);
        expect(tds.at(5).text()).toEqual("N/A");
      });
  });

  it("should show alert when failed to get accounts", () => {
    store = mockStore({ accounts: { accounts: [], failed: true } });
    const wrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <AccountList />
        </BrowserRouter>
      </Provider>
    );
    expect(wrapper.find("Alert").length).toBe(1);
    expect(wrapper.find("Alert").text()).toContain("Loading accounts failed");
  });

  it("should show delete failed notification when DELETE /accounts/:id fails", async () => {
    const accounts = [
      {
        _id: "deadbeefcafebabe",
        name: "Awesome Account",
        financialInstitution: "Awesome Bank",
        type: "CHECKING",
        currentBalance: "0.00"
      }
    ];
    store = mockStore({
      accounts: {
        accounts,
        failed: false,
        uiOptions: { groupBy: null }
      }
    });
    const wrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <AccountList />
        </BrowserRouter>
      </Provider>
    );
    await deleteAccount("deadbeefcafebabe")(store.dispatch);
    const actions = store.getActions().filter(action => {
      return (
        [
          actionTypes.FETCH_ACCOUNTS_REQUESTED,
          actionTypes.FETCH_ACCOUNTS_SUCCEEDED
        ].indexOf(action.type) === -1
      );
    });

    expect(actions[0].type).toBe(actionTypes.DELETE_ACCOUNT_REQUESTED);
    expect(actions[0].accountId).toBe("deadbeefcafebabe");

    expect(actions[1].type).toBe("RNS_SHOW_NOTIFICATION");
    expect(actions[1].title).toBe("Cannot delete account");
    expect(actions[1].level).toBe("error");

    expect(actions[2].type).toBe(actionTypes.DELETE_ACCOUNT_FAILED);

    expect(store.getState().accounts.accounts.length).toBe(1);
  });

  it("should remove deleted account when DELETE /accounts/:id succeeds", async () => {
    const accounts = [
      {
        _id: "deadbeefcafebabe",
        name: "Awesome Account",
        financialInstitution: "Awesome Bank",
        type: "CHECKING",
        currentBalance: "0.00"
      }
    ];
    accounts.forEach(async account => {
      await db.post(account);
    });
    store = mockStore({
      accounts: {
        accounts,
        failed: false,
        uiOptions: { groupBy: null }
      }
    });
    const wrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <AccountList />
        </BrowserRouter>
      </Provider>
    );
    await deleteAccount("deadbeefcafebabe")(store.dispatch);
    const actions = store.getActions().filter(action => {
      return (
        [
          actionTypes.FETCH_ACCOUNTS_REQUESTED,
          actionTypes.FETCH_ACCOUNTS_SUCCEEDED
        ].indexOf(action.type) === -1
      );
    });

    expect(actions[0].type).toBe(actionTypes.DELETE_ACCOUNT_REQUESTED);
    expect(actions[0].accountId).toBe("deadbeefcafebabe");

    expect(actions[1].type).toBe("RNS_SHOW_NOTIFICATION");
    expect(actions[1].title).toBe("The account was deleted");
    expect(actions[1].level).toBe("success");

    expect(actions[2].type).toBe(actionTypes.DELETE_ACCOUNT_SUCCEEDED);
  });
});
