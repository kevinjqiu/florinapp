import { Response, Request } from "express";
import { db } from "../db";
import { Category } from "../db/Category";
import SearchResponse from "../dtos/SearchResponse";
import CategoryDTO from "../dtos/Category";

class CategorySearchRequest {}

export const search = async (
  req: CategorySearchRequest
): Promise<SearchResponse<CategoryDTO>> => {
  const result = await (<any>db).find({
    selector: { "metadata.docType": "category" }
  });

  const categories: Array<Category> = result.docs;
  const categoriesMap = {};
  const categoryDtos = categories
    .filter((category: Category) => category.parent === null)
    .map(category => new CategoryDTO(category));
  const secondLevelCategories = categories.filter(
    (category: Category) => category.parent !== null
  );
  categoryDtos.forEach(category => {
    category.subCategories = secondLevelCategories
      .filter(subCategory => subCategory.parent === category.id)
      .map(category => new CategoryDTO(category));
  });
  categoryDtos.sort((a, b) => a.id.localeCompare(b.id));
  return new SearchResponse<CategoryDTO>(categoryDtos);
};
