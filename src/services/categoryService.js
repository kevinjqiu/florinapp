import Category from "../models/Category";
import db from "../db";
import { MAX_NUMBER } from "./const";
import * as transactionService from "../services/transactionService";

export type FetchOptions = {
  filters: {
    type: string
  }
};

export const defaultFetchOptions = {
  filters: {}
}

export const fetch = async (options: FetchOptions = defaultFetchOptions): Promise<Array<Category>> => {
  let query = {
    selector: {
      "metadata.type": "Category"
    },
    limit: MAX_NUMBER
  };

  if (options.filters.type !== undefined) {
    query = {
      ...query,
      selector: {
        ...query.selector,
        type: options.filters.type
      }
    }
  }
  const response = await db.find(query);
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

export const update = async (categoryId: string, categoryData: Category): Promise<Category> => {
  let category = {
    ...(await db.get(categoryId)),
    ...categoryData
  }

  await db.put(category);

  return new Category(category);  // TODO: fetchById?
}

export const del = async (categoryId: string) => {
  const doc = await db.get(categoryId);
  await db.remove(doc);
  const transactions = await transactionService.fetch({
    orderBy: ["date", "asc"],
    pagination: {
      perPage: MAX_NUMBER,
      page: 1
    },
    filters: { categoryId }
  });

  await Promise.all(transactions.result.map(t => {
    return transactionService.updateCategory(t._id, undefined);
  }));

  const response = await db.find({
    selector: {
      "metadata.type": "Category",
      parent: categoryId
    },
    limit: MAX_NUMBER
  });

  await Promise.all(response.docs.map(async doc => {
    await db.put({
      ...doc,
      parent: undefined
    });
  }));
}