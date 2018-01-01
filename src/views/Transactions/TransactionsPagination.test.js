import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { configure, shallow, mount } from "enzyme";
import configureMockStore from "redux-mock-store";
import Adapter from "enzyme-adapter-react-16";
import TransactionsPagination from "./TransactionsPagination";

configure({ adapter: new Adapter() });
const mockStore = configureMockStore();

const assertLinkHref = (element, href) => {
  const actual = element
    .find("a")
    .at(0)
    .props().href;
  expect(actual).toEqual(href);
};

describe("TransactionPagination", () => {
  let store;

  it("should render pagination links", () => {
    const state = {
      transactions: {
        total: 100,
        fetchOptions: {
          pagination: {
            perPage: 25,
            page: 1
          }
        }
      },
      router: {
        location: {
          pathname: "/transactions",
          search: "?foo=bar&quux=derp"
        }
      }
    };
    store = mockStore(state);
    const wrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <TransactionsPagination />
        </BrowserRouter>
      </Provider>
    );
    const element = wrapper.find("TransactionsPagination");
    const firstPageLink = element.find("FirstPageLink");
    assertLinkHref(firstPageLink, "/transactions?foo=bar&page=1&quux=derp");
    expect(firstPageLink.props().disabled).toBe(true);

    const pageLinks = element.find("PageLink");
    expect(pageLinks.length).toBe(4);

    pageLinks.forEach((link, idx) => {
      assertLinkHref(link, `/transactions?foo=bar&page=${idx + 1}&quux=derp`);
      if (idx + 1 === state.transactions.fetchOptions.pagination.page) {
        expect(link.props().active).toBe(true);
      }
    });

    const lastPageLink = element.find("LastPageLink");
    assertLinkHref(lastPageLink, "/transactions?foo=bar&page=4&quux=derp");
  });

  it("should render single item pagination", () => {
    const state = {
      transactions: {
        total: 1,
        fetchOptions: {
          pagination: {
            perPage: 25,
            page: 1
          }
        }
      },
      router: {
        location: {
          pathname: "/transactions",
          search: "?foo=bar&quux=derp"
        }
      }
    };
    store = mockStore(state);
    const wrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <TransactionsPagination />
        </BrowserRouter>
      </Provider>
    );
    const element = wrapper.find("TransactionsPagination");
    const firstPageLink = element.find("FirstPageLink");
    assertLinkHref(firstPageLink, "/transactions?foo=bar&page=1&quux=derp");
    expect(firstPageLink.props().disabled).toBe(true);

    const lastPageLink = element.find("LastPageLink");
    assertLinkHref(lastPageLink, "/transactions?foo=bar&page=1&quux=derp");
    expect(lastPageLink.props().disabled).toBe(true);
  });

  it("should render properly when total number is not evenly divisible by perPage", () => {
    const state = {
      transactions: {
        total: 101,
        fetchOptions: {
          pagination: {
            perPage: 25,
            page: 3
          }
        }
      },
      router: {
        location: {
          pathname: "/transactions",
          search: "?foo=bar&quux=derp"
        }
      }
    };
    store = mockStore(state);
    const wrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <TransactionsPagination />
        </BrowserRouter>
      </Provider>
    );
    const element = wrapper.find("TransactionsPagination");
    const firstPageLink = element.find("FirstPageLink");
    assertLinkHref(firstPageLink, "/transactions?foo=bar&page=1&quux=derp");
    expect(firstPageLink.props().disabled).toBe(false);

    const pageLinks = element.find("PageLink");
    expect(pageLinks.length).toBe(5);
    pageLinks.forEach((link, idx) => {
      assertLinkHref(link, `/transactions?foo=bar&page=${idx + 1}&quux=derp`);
      if (idx + 1 === state.transactions.fetchOptions.pagination.page) {
        expect(link.props().active).toBe(true);
      }
    });

    const lastPageLink = element.find("LastPageLink");
    assertLinkHref(lastPageLink, "/transactions?foo=bar&page=5&quux=derp");
    expect(lastPageLink.props().disabled).toBe(false);
  });
});
