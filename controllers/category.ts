import { Response, Request } from "express";
import db from "../db";
import { Category } from "../db/Category";

class SearchResponse<T> {
    result: Array<T>;
    total: number;
    constructor(result: Array<T>) {
        this.result = result;
        this.total = result.length;
    }
}

class CategorySearchRequest {}

export const search = async (req: CategorySearchRequest): Promise<SearchResponse<Category>> => {
  const result = await (<any>db).find({
    selector: { "metadata.docType": "category" }
  });

  return new SearchResponse<Category>(result.docs);
};