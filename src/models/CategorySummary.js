// @flow

import type { CategoryType } from "./CategoryType";

export class Summary {
  categoryId: string;
  categoryName: string;
  categoryType: CategoryType;
  parentCategoryId: string;
  amount: string;

  constructor(obj: {}) {
    Object.assign(this, obj);
  }
}

export class CategorySummary {
  incomeCategories: Array<Summary>;
  expensesCategories: Array<Summary>;

  constructor(obj: {}) {
    Object.assign(this, obj);
  }
}