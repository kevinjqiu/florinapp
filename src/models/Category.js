// @flow
import type { CategoryType } from "./CategoryType";
import FlorinBase from "./FlorinBase";

export default class Category extends FlorinBase {
  _id: string;
  name: string;
  parent: ?string;
  type: CategoryType;
  // Whether or not transactions are allowed to be tagged this category
  allowTransactions: boolean;

  constructor(props: {_id: string, name: string, parent: ?string, type: CategoryType, allowTransactions: boolean}) {
    super("Category");
    Object.assign(this, props);
  }

  isParent() {
    return this.parent === null;
  }
}