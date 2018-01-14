import Category from "../models/Category";
import db from "../db";
import { MAX_NUMBER } from "./const";

export const fetch = async (): Promise<Array<Category>> => {
  const response = await db.find({
    selector: { "metadata.type": "Category" },
    limit: MAX_NUMBER
  });
  return response.docs.map(doc => new Category(doc));
};

export const create = async (categoryData: Category): Promise<Category> => {
  // TODO: fill me
  return new Category();
}