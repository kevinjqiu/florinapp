import * as PouchDB from "pouchdb";
import * as decimal from "decimal.js";
import FlorinBase from "./FlorinBase";

export enum TransactionType {
  DEBIT = "DEBIT",
  CREDIT = "CREDIT"
}
export interface Transaction extends FlorinBase {
  date: Date;
  info: string;
  payee: string;
  description: string;
  amount: decimal.Decimal;
  accountId: string;
  categoryId: string;
  type: TransactionType;
  isDeleted: boolean;
  checksum: string;
  tags: Array<string>;
  linkedTransaction: string;
}

export const newTransaction = (): Transaction => {
  return <any>{};
};
