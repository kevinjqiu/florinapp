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

  afterEach(() => {
      mock.reset();
  });

  it("Should show that no existing accounts when nothing in store", () => {
    mock.onGet("/api/v2/accounts").reply(200, { result: [] });
    store = mockStore({ accounts: [] });
    const wrapper = mount(<Provider store={store}>
        <BrowserRouter>
          <Accounts accounts={[]} />
        </BrowserRouter>
      </Provider>);
    const cardBody = wrapper.find('CardBody');
    console.log(cardBody.debug());
    expect(cardBody.find(".card-body").text()).toContain("There are currently no existing accounts.");
    expect(cardBody.find("NewAccountButton").length).toBe(1);
  });
});
