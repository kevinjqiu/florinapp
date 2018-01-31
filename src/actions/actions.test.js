import sinon from "sinon";
import { FlushThunks, Thunk } from "redux-testkit";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reset from "../db/reset";
import * as actionCreators from "./creators";
import * as actionTypes from "./types";
import * as actions from "./index";
import * as transactionService from "../services/transactionService";
import * as accountService from "../services/accountService";
import * as categoryService from "../services/categoryService";
import * as settingsService from "../services/settingsService";
import Account from "../models/Account";
import Transaction from "../models/Transaction";
import Category from "../models/Category";
import Settings from "../models/Settings";
import reducer from "../reducers";

const expectNotificationTitle = ({ notifications }, notificationTitle) => {
  expect(notifications.length).toEqual(1);
  expect(notifications[0].title).toEqual(notificationTitle);
};

const assertServiceAction = async (store, action, ...assertionCallbacks) => {
  await store.dispatch(action);
  const { notifications } = store.getState();
  assertionCallbacks.forEach(c => c(store.getState()));
};

const setup = async () => {
  const flushThunks = FlushThunks.createMiddleware();
  const store = createStore(reducer, applyMiddleware(flushThunks, thunk));
  return store;
};

describe("Account", () => {
  let store;

  beforeEach(async () => {
    store = await setup();
  });

  describe("fetchAccounts", () => {
    let fetch = null;

    beforeEach(() => {
      fetch = sinon.stub(accountService, "fetch");
    });

    afterEach(() => {
      fetch.restore();
    });

    it("should set state to empty accounts when no accounts are loaded", async () => {
      fetch.returns([]);
      await assertServiceAction(
        store,
        actions.fetchAccounts(),
        ({ accounts }) => {
          expect(accounts.accounts.length).toEqual(0);
        }
      );
    });

    it("should load the accounts", async () => {
      fetch.returns([
        new Account({
          name: "TEST",
          financialInstitution: "TEST_FI",
          type: "CHECKING"
        })
      ]);
      await assertServiceAction(
        store,
        actions.fetchAccounts(),
        ({ accounts }) => {
          expect(accounts.accounts.length).toBe(1);
          expect(accounts.accounts[0].name).toEqual("TEST");
          expect(accounts.accounts[0].financialInstitution).toEqual("TEST_FI");
          expect(accounts.accounts[0].type).toEqual("CHECKING");
        }
      );
    });

    it("should signal failure when accountService.fetch fails", async () => {
      fetch.throws();
      await assertServiceAction(
        store,
        actions.fetchAccounts(),
        ({ accounts }) => {
          expect(accounts.accounts.length).toBe(0);
          expect(accounts.failed).toBe(true);
        }
      );
    });
  });

  describe("deleteAccount", () => {
    let del = null;

    beforeEach(() => {
      del = sinon.stub(accountService, "del");
    });

    afterEach(() => {
      del.restore();
    });

    it("should signal failure when account to delete does not exist", async () => {
      del.throws();
      await assertServiceAction(
        store,
        actions.deleteAccount("nonexistent"),
        state => expectNotificationTitle(state, "Failed to delete account")
      );
    });

    it("should delete the account from the store", async () => {
      await assertServiceAction(
        store,
        actions.deleteAccount("nonexistent"),
        state => expectNotificationTitle(state, "Account deleted")
      );
    });
  });

  describe("createAccount", () => {
    let createAccount = null;

    beforeEach(() => {
      createAccount = sinon.stub(accountService, "create");
    });

    afterEach(() => {
      createAccount.restore();
    });

    it("should create account", async () => {
      await store.dispatch(
        actions.createAccount(
          new Account({
            name: "TEST",
            financialInstitution: "FI",
            type: "CHECKING"
          })
        )
      );
      const { notifications } = store.getState();
      expect(notifications.length).toBe(1);
      expect(notifications[0].title).toEqual("Account created");
    });

    it("should show error message if account.create fails", async () => {
      createAccount.throws();
      await store.dispatch(
        actions.createAccount(
          new Account({
            name: "TEST",
            financialInstitution: "FI",
            type: "CHECKING"
          })
        )
      );
      const { notifications } = store.getState();
      expect(notifications.length).toBe(1);
      expect(notifications[0].title).toEqual("Failed to create account");
    });
  });

  describe("updateAccount", () => {
    let update;
    beforeEach(() => {
      update = sinon.stub(accountService, "update");
    });

    afterEach(() => {
      update.restore();
    });

    it("should update account", async () => {
      await assertServiceAction(
        store,
        actions.updateAccount(
          "a1",
          new Account({
            name: "TEST",
            financialInstitution: "TEST_FI",
            type: "INVESTMENT"
          })
        ),
        state => expectNotificationTitle(state, "Account updated")
      );
    });

    it("should notify error when account update fails", async () => {
      update.throws();
      await assertServiceAction(
        store,
        actions.updateAccount(
          "a1",
          new Account({
            name: "TEST",
            financialInstitution: "TEST_FI",
            type: "INVESTMENT"
          })
        ),
        state => expectNotificationTitle(state, "Account update failed")
      );
    });
  });

  describe("fetchAccountById", () => {
    let fetchById;
    beforeEach(() => {
      fetchById = sinon.stub(accountService, "fetchById");
    });

    afterEach(() => {
      fetchById.restore();
    });

    it("should fetch account by id", async () => {
      fetchById.returns(
        new Account({
          _id: "a1",
          name: "TEST",
          financialInstitution: "TEST_FI",
          type: "CHECKING"
        })
      );

      await assertServiceAction(
        store,
        actions.fetchAccountById("a1"),
        ({ currentAccount }) => {
          expect(currentAccount.name).toEqual("TEST");
          expect(currentAccount.financialInstitution).toEqual("TEST_FI");
          expect(currentAccount.type).toEqual("CHECKING");
        }
      );
    });

    it("should return error when account not found", async () => {
      await assertServiceAction(
        store,
        actions.fetchAccountById("nonexistent"),
        ({ currentAccount }) => expect(currentAccount).toBe(null),
        state => expectNotificationTitle(state, "Failed to get account")
      );
    });
  });
});

describe("Transactions", () => {
  let store;

  beforeEach(async () => {
    store = await setup();
  });

  describe("fetchTransactions", () => {
    let fetch;

    beforeEach(() => {
      fetch = sinon.stub(transactionService, "fetch");
    });

    afterEach(() => {
      fetch.restore();
    });

    it("should return empty when there's no transactions", async () => {
      fetch.returns({ result: [] });
      await assertServiceAction(
        store,
        actions.fetchTransactions(),
        ({ transactions }) => {
          expect(transactions.transactions).toEqual([]);
        }
      );
    });

    it("should signal failure when transactionService.fetch fails", async () => {
      fetch.throws();
      await assertServiceAction(
        store,
        actions.fetchTransactions(),
        ({ transactions }) => {
          expect(transactions.loading).toBe(false);
          expect(transactions.failed).toBe(true);
        }
      );
    });

    it("should fetch associated account when possible", async () => {
      fetch.returns({
        result: [
          new Transaction({
            _id: "txn1",
            date: "2017-01-01",
            accountId: "a1"
          }),
          new Transaction({ _id: "txn2", date: "2017-05-05" })
        ]
      });

      await assertServiceAction(
        store,
        actions.fetchTransactions({
          orderBy: ["date", "asc"],
          pagination: { perPage: 999, page: 1 },
          filters: {}
        }),
        state => {
          const { transactions, loading, failed } = state.transactions;
          expect(loading).toBe(false);
          expect(failed).toBe(false);
          expect(transactions.length).toBe(2);
          expect(transactions[0]._id).toEqual("txn1");
          expect(transactions[1]._id).toEqual("txn2");
        }
      );
    });
  });

  describe("createTransaction", () => {
    let createMethod = null;

    beforeEach(() => {
      createMethod = sinon.stub(transactionService, "create");
    });

    afterEach(() => {
      createMethod.restore();
    });

    it("should call transactionService.create", async () => {
      await assertServiceAction(
        store,
        actions.createTransaction(new Transaction({})),
        state => {
          expectNotificationTitle(state, "Transaction created");
        }
      );
    });

    it("should throw exception when transactionService.create fails", async () => {
      createMethod.throws();

      await assertServiceAction(
        store,
        actions.createTransaction(new Transaction({})),
        state => {
          expectNotificationTitle(state, "Cannot create transaction");
        }
      );
    });
  });

  describe("updateTransaction", () => {
    let updateMethod = null;
    beforeEach(() => {
      updateMethod = sinon.stub(transactionService, "update");
    });

    afterEach(() => {
      updateMethod.restore();
    });

    it("should call transactionService.update", async () => {
      await assertServiceAction(
        store,
        actions.updateTransaction("txn1", new Transaction({ _id: "txn1" })),
        state => {
          expectNotificationTitle(state, "Transaction updated");
        }
      );
    });

    it("should throw exception when transactionService.update fails", async () => {
      updateMethod.throws();
      await assertServiceAction(
        store,
        actions.updateTransaction("txn1", new Transaction({ _id: "txn1" })),
        state => {
          expectNotificationTitle(state, "Transaction update failed");
        }
      );
    });
  });

  describe("fetchTransactionById", () => {
    let fetchById = null;
    beforeEach(() => {
      fetchById = sinon.stub(transactionService, "fetchById");
    });

    afterEach(() => {
      fetchById.restore();
    });

    it("should call transactionService.update", async () => {
      const txn = new Transaction({ _id: "txn1" });
      fetchById.returns(txn);
      await assertServiceAction(
        store,
        actions.fetchTransactionById("txn1"),
        ({ transactions }) => {
          expect(transactions.currentTransaction).toEqual(txn);
        }
      );
    });

    it("should throw exception when transactionService.update fails", async () => {
      fetchById.throws();
      await assertServiceAction(
        store,
        actions.fetchTransactionById("txn1"),
        state => {
          expectNotificationTitle(state, "Failed to get transaction");
        }
      );
    });
  });

  describe("deleteTransaction", () => {
    let del = null;
    beforeEach(() => {
      del = sinon.stub(transactionService, "del");
    });

    afterEach(() => {
      del.restore();
    });

    it("should call transactionService.del", async () => {
      del.returns({});
      await assertServiceAction(
        store,
        actions.deleteTransaction("txn1"),
        state => {
          expectNotificationTitle(state, "Transaction deleted");
        }
      );
    });

    it("should throw exception when transactionService.del fails", async () => {
      del.throws();
      await assertServiceAction(
        store,
        actions.deleteTransaction("txn1"),
        state => {
          expectNotificationTitle(state, "Failed to delete transaction");
        }
      );
    });
  });
});

describe("Category", () => {
  let store;

  beforeEach(async () => {
    store = await setup();
  });

  describe("fetchCategories", () => {
    let fetch;

    beforeEach(() => {
      fetch = sinon.stub(categoryService, "fetch");
    });

    afterEach(() => {
      fetch.restore();
    });

    it("should fetch categories", async () => {
      fetch.returns([new Category()]);
      await assertServiceAction(
        store,
        actions.fetchCategories(),
        ({ categories }) => {
          expect(categories.categories.length).toEqual(1);
        }
      );
    });

    it("should signal error when fetch fails", async () => {
      fetch.throws();
      await assertServiceAction(store, actions.fetchCategories(), state =>
        expectNotificationTitle(state, "Cannot fetch categories")
      );
    });
  });
});

describe("Settings", () => {
  let store;

  beforeEach(async () => {
    store = await setup();
  });

  describe("fetchSettings", () => {
    let fetch;
    beforeEach(() => {
      fetch = sinon.stub(settingsService, "fetch");
    })

    afterEach(() => {
      fetch.restore();
    });

    it("should fetch settings", async () => {
      fetch.returns(new Settings());
      await assertServiceAction(
        store,
        actions.fetchSettings(),
        ({ settings }) => {
          expect(settings.settings.locale).toEqual("en_US");
        }
      );
    });

    it("should signal error when fetch fails", async () => {
      fetch.throws();
      await assertServiceAction(store, actions.fetchSettings(), state =>
        expectNotificationTitle(state, "Failed to fetch settings")
      );
    });
  })
})