import * as PouchDB from "pouchdb";
import FlorinBase from './FlorinBase';

export enum CategoryType {
  EXPENSE = "EXPENSE",
  INCOME = "INCOME"
}

export interface Category extends FlorinBase {
  name: string;
  parent: string | null;

  type: string;
};

export const newCategory = (
  id: string,
  name: string,
  parent: string | null = null,
  type: CategoryType = CategoryType.EXPENSE
): Category => {
  return { metadata: { docType: "category" }, _id: id, name, parent, type };
};

export const seed = (): Array<Category> => {
  return [
    newCategory("automobile", "Automobile"),
    newCategory("bankcharges", "Bank Charges"),
    newCategory("bills", "Bills"),
    newCategory("mortgage", "Mortgage")
  ];
};