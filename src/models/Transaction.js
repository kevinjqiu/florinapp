// @flow
import FlorinBase from "./FlorinBase";
import type { TransactionType } from "./TransactionType";
import Account from "./Account";
import shajs from "sha.js";
import db from "../db";

const FIELDS_TO_HASH = ["amount", "date", "name", "memo", "type"];

export default class Transaction extends FlorinBase {
  _id: string;
  accountId: string;
  account: Account;
  amount: string;
  date: string;
  info: ?string;
  name: string;
  memo: string;
  categoryId: ?string;
  isDeleted: boolean;
  checksum: string;
  type: TransactionType;
  // id of the transaction this transaction is split from
  splitFrom: ?string;
  // id of the transaction this transaction links to (for internal transfers)
  linkedTo: ?string;

  constructor(props: {}) {
    super("Transaction");
    Object.assign(this, props);
    this.updateChecksum();
  }

  updateChecksum() {
    const sha = shajs("sha256");
    FIELDS_TO_HASH.forEach(field => {
      const val = this[field];
      if (val) {
        sha.update(val);
      }
    });
    this.checksum = `sha256:${sha.digest("hex")}`;
  }

  async getAccount(): Promise<Account|null> {
    return await db.get(this.accountId)
  }
}
