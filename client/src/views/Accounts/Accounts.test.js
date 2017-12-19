import React from "react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { configure, mount, shallow } from "enzyme";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import Adapter from "enzyme-adapter-react-15";
import Accounts from "./Accounts";

configure({ adapter: new Adapter() });
const mockStore = configureMockStore([thunk]);

describe("Account", () => {
  let store;
  const mock = new MockAdapter(axios);

  beforeEach(() => {
    store = mockStore({ accounts: [] });
  });

  afterEach(() => {
    mock.reset();
  });

  it("should show 'no existing accounts' and the create account button when GET /accounts return empty", () => {
    mock.onGet("/api/v2/accounts").reply(200, { result: [] });
    const wrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <Accounts />
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
        type: "CHECKING"
      },
      {
        id: "cafebabe123",
        name: "Another Account",
        financialInstitution: "Another Bank",
        type: "CREDIT_CARD"
      }
    ];
    store = mockStore({ accounts });
    mock.onGet("/api/v2/accounts").reply(200, {
      result: accounts
    });
    const wrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <Accounts />
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
    })
  });
});
