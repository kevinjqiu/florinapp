import * as fs from "fs";
import OfxAdapter from "./OfxAdapter";

describe("OfxAdapter", () => {
  const content = fs
    .readFileSync(`${__dirname}/fixtures/newtxns.ofx`)
    .toString();
  let adapter;

  beforeEach(() => {
    adapter = new OfxAdapter(content);
  });

  describe("OfxAdapter.getTransactions", () => {
    it("should return transaction date in ISO format", async () => {
      const transactions = await adapter.getTransactions({ _id: "ACCOUNT_ID" });
      expect(transactions.length).toBe(3);
      expect(transactions[0].date).toBe("2012-01-03T12:00:00.000Z");
      expect(transactions[1].date).toBe("2012-01-05T12:00:00.000Z");
      expect(transactions[2].date).toBe("2012-01-05T12:00:00.000Z");
    });

    it("should return associate the transaction to the right account", async () => {
      const transactions = await adapter.getTransactions({ _id: "ACCOUNT_ID" });
      expect(transactions.length).toBe(3);
      expect(transactions[0].accountId).toBe("ACCOUNT_ID");
      expect(transactions[1].accountId).toBe("ACCOUNT_ID");
      expect(transactions[2].accountId).toBe("ACCOUNT_ID");
    });
  });

  describe("OfxAdapter.getBalance", () => {
    it("should return balance date in ISO format", async () => {
      const balance = await adapter.getBalance();
      expect(balance).toEqual({dateTime: "2012-01-26T08:00:00.000Z", amount: "16.00"});
    })
  });
});
