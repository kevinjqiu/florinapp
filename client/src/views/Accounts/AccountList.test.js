import React from "react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
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

configure({ adapter: new Adapter() });
const mockStore = configureMockStore([thunk]);

describe("Account", () => {
  let store;
  const mock = new MockAdapter(axios);

  afterEach(() => {
    mock.reset();
  });

  it("should show 'no existing accounts' and the create account button when GET /accounts return empty", () => {
    store = mockStore({ ui: { accounts: {}}, accounts: [] });
    mock.onGet("/api/v2/accounts").reply(200, { result: [] });
    const wrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <AccountList />
        </BrowserRouter>
      </Provider>
    );
    const cardBody = wrapper.find("CardBody");
    expect(cardBody.find(".card-body").text()).toContain(
      "There are currently no existing accounts."
    );
    expect(cardBody.find("NewAccountButton").length).toBe(1);
  });

  it("should populate accounts table with accounts from GET /accounts", () => {
    const accounts = [
      {
        id: "abcdefghijk",
        name: "Awesome Account",
        financialInstitution: "Awesome Bank",
        type: "CHECKING",
        currentBalance: "0.00"
      },
      {
        id: "cafebabe123",
        name: "Another Account",
        financialInstitution: "Another Bank",
        type: "CREDIT_CARD",
        currentBalance: "0.00"
      }
    ];
    store = mockStore({ accounts, ui: { accounts: {} } });
    mock.onGet("/api/v2/accounts").reply(200, {
      result: accounts
    });
    const wrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <AccountList />
        </BrowserRouter>
      </Provider>
    );
    const cardBody = wrapper.find("CardBody");
    expect(cardBody.find("tbody").find("tr").length).toBe(accounts.length);
    cardBody.find("tbody").find("tr").forEach((tr, idx) => {
      const tds = tr.find("td");
      const links = tds.at(0).find("Link");
      expect(links.length).toBe(1);
      expect(links.at(0).prop("to")).toEqual(`/accounts/${accounts[idx].id}`);
      expect(tds.at(1).text()).toEqual(accounts[idx].financialInstitution);
      expect(tds.at(2).text()).toEqual(accounts[idx].type);
      expect(tds.at(3).text()).toEqual('$' + accounts[idx].currentBalance);
    })
  });

  it("should show alert when failed to GET /accounts", () => {
    store = mockStore({ accounts: [], ui: { accounts: { failed: true } } });
    mock.onGet("/api/v2/accounts").timeout();
    const wrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <AccountList />
        </BrowserRouter>
      </Provider>
    );
    expect(wrapper.find("Alert").length).toBe(1);
    expect(wrapper.find("Alert").text()).toContain("Loading accounts failed");
  })

  it("should show delete failed notification when DELETE /accounts/:id fails", async () => {
    const accounts = [{ id: "deadbeefcafebabe", name: "Awesome Account", financialInstitution: "Awesome Bank", type: "CHECKING", currentBalance: "0.00" }];
    store = mockStore({
      accounts,
      ui: { accounts: { failed: false } }
    });
    mock.onGet("/api/v2/accounts").reply(200, { result: accounts });
    mock.onDelete("/api/v2/accounts/deadbeefcafebabe").timeout();
    const wrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <AccountList />
        </BrowserRouter>
      </Provider>
    );
    await deleteAccount("deadbeefcafebabe")(store.dispatch);
    const actions = store.getActions().filter(action => {
      return [actionTypes.FETCH_ACCOUNTS_REQUESTED, actionTypes.FETCH_ACCOUNTS_SUCCEEDED].indexOf(action.type) === -1;
    });

    expect(actions[0].type).toBe(actionTypes.DELETE_ACCOUNT_REQUESTED)
    expect(actions[0].accountId).toBe("deadbeefcafebabe");

    expect(actions[1].type).toBe("RNS_SHOW_NOTIFICATION");
    expect(actions[1].title).toBe("Cannot delete account");
    expect(actions[1].message).toBe("Error: timeout of 0ms exceeded");
    expect(actions[1].level).toBe("error");

    expect(actions[2].type).toBe(actionTypes.DELETE_ACCOUNT_FAILED);

    expect(store.getState().accounts.length).toBe(1);
  })

  it("should remove deleted account when DELETE /accounts/:id succeeds", async () => {
    const accounts = [{ id: "deadbeefcafebabe", name: "Awesome Account", financialInstitution: "Awesome Bank", type: "CHECKING", currentBalance: "0.00" }];
    store = mockStore({
      accounts,
      ui: { accounts: { failed: false } }
    });
    mock.onGet("/api/v2/accounts").reply(200, { result: accounts });
    mock.onDelete("/api/v2/accounts/deadbeefcafebabe").reply(200, {});
    const wrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <AccountList />
        </BrowserRouter>
      </Provider>
    );
    await deleteAccount("deadbeefcafebabe")(store.dispatch);
    const actions = store.getActions().filter(action => {
      return [actionTypes.FETCH_ACCOUNTS_REQUESTED, actionTypes.FETCH_ACCOUNTS_SUCCEEDED].indexOf(action.type) === -1;
    });

    expect(actions[0].type).toBe(actionTypes.DELETE_ACCOUNT_REQUESTED)
    expect(actions[0].accountId).toBe("deadbeefcafebabe");

    expect(actions[1].type).toBe("RNS_SHOW_NOTIFICATION");
    expect(actions[1].title).toBe('The account was deleted');
    expect(actions[1].level).toBe("success");

    expect(actions[2].type).toBe(actionTypes.DELETE_ACCOUNT_SUCCEEDED);
  })
});