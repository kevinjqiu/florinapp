import { CategoryType, Category } from "../db/Category";

export default class CategoryDTO {
  id: string;
  name: string;
  type: CategoryType;
  allowTransactions: boolean;
  subCategories: Array<CategoryDTO> = [];

  constructor(category: Category) {
    const { _id, name, type, allowTransactions } = category;
    this.id = _id;
    this.name = name;
    this.type = type;
    this.allowTransactions = allowTransactions;
  }
}
