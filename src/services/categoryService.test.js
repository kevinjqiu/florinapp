import * as categoryService from "./categoryService";
import db from "../db";
import reset from "../db/reset";
import seed from "../db/seed";
import Category from "../models/Category";

describe("categoryService", () => {
  beforeEach(async () => {
    await reset();
    await seed(db);
  });

  describe("categoryService.fetch", () => {
    it("should fetch seeded categories", async () => {
      const categories = await categoryService.fetch();
      expect(categories.length).toEqual(57);
    });
  });

  describe("categoryService.create", () => {
    it("should create a top-level category with id being lowercased name", async () => {
      const category = await categoryService.create({
        name: "Awesome Category",
        parent: null
      });

      expect(category._id).toEqual("awesomecategory");
    });

    it("should create a sub-category with id being the parent hyphen subcategory name", async () => {
      await categoryService.create({
        _id: "awesomecategory",
        name: "Awesome Category",
        parent: null
      });

      const subcategory = await categoryService.create({
        name: "Sub awesome category",
        parent: "awesomecategory"
      });

      expect(subcategory._id).toEqual("awesomecategory-subawesomecategory");
    });
  })
});
