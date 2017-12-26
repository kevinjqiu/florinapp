// @flow
import FlorinBase from "./FlorinBase";
import type { TransactionType } from "./TransactionType";

export default class Transaction extends FlorinBase {
  _id: string;
  accountId: string;
  amount: string;
  date: string;
  info: string;
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
  }
}
