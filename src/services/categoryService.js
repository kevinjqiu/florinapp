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

const generateId = (categoryData: Category): string => {
  const { name, parent } = categoryData;
  const normalizedCategoryName = name.replace(/[^A-Z0-9]/ig, "").toLowerCase();
  if (parent) {
    return `${parent}-${normalizedCategoryName}`;
  }
  return normalizedCategoryName;
}

export const create = async (categoryData: Category): Promise<Category> => {
  if (!categoryData._id) {
    categoryData._id = generateId(categoryData);
  } 
  const response = await db.post(categoryData);
  return new Category(await db.get(response.id));
}