import * as accountService from "./accountService";
import Account from "../models/Account";
import db from "../db";
import reset from "../db/reset";

describe("accountService", () => {
  beforeEach(async () => {
    await reset();
  });

  describe("accountService.fetch", () => {
    it("fetches existing accounts", async () => {
      await db.post(new Account({}));
      await db.post(new Account({}));
      await db.post(new Account({}));
      const accounts = await accountService.fetch();
      expect(accounts.length).toBe(3);
    });
  });

  describe("accountService.del", () => {
    it("deletes existing account", async () => {
      const account = await db.post(new Account({}));
      await db.post(new Account({}));
      await db.post(new Account({}));
      let accounts = await accountService.fetch();
      expect(accounts.length).toBe(3);
      await accountService.del(account.id);
      accounts = await accountService.fetch();
      expect(accounts.length).toBe(2);
    });

    it("deletes non-existing account", async () => {
      try {
        await accountService.del("FOO");
        fail("Did not throw");
      } catch (error) {
        expect(error.status).toBe(404);
      }
    });
  });

  describe("accountService.fetchById", () => {
    it("fetches an existing account", async () => {
      const response = await db.post(new Account({}));
      const account = await accountService.fetchById(response.id);
      expect(account._id).toEqual(response.id);
    });

    it("errors on non-existing account", async () => {
      try {
        const account = await accountService.fetchById("FOO");
        fail("Did no throw");
      } catch (error) {
        expect(error.status).toBe(404);
      }
    });
  });

  describe("accountService.update", () => {
    it("updates an existing account", async () => {
      const response = await db.post(new Account({}));
      await accountService.update(response.id, { name: "UPDATED" });
      const updatedAccount = await db.get(response.id);
      expect(updatedAccount.name).toEqual("UPDATED");
    });

    it("errors on non-existing account", async () => {
      try {
        await accountService.update("FOO", { name: "UPDATED" });
        fail("Did not throw");
      } catch (error) {
        expect(error.status).toBe(404);
      }
    });
  });

  describe("accountService.create", () => {
    it("should create a new account", async () => {
      const account = new Account({ name: "TEST" });
      const response = await accountService.create(account);
      expect(response.name).toEqual("TEST");
    });
  });
});
