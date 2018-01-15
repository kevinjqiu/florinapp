import * as categoryService from "./categoryService";
import db from "../db";
import reset from "../db/reset";
import seed from "../db/seed";
import Category from "../models/Category";
import Transaction from "../models/Transaction";

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
      const category = await categoryService.create(new Category({
        name: "Awesome Category",
        parent: null
      }));

      expect(category._id).toEqual("awesomecategory");
    });

    it("should create a sub-category with id being the parent hyphen subcategory name", async () => {
      await categoryService.create(new Category({
        _id: "awesomecategory",
        name: "Awesome Category",
        parent: null
      }));

      const subcategory = await categoryService.create(new Category({
        name: "Sub awesome category",
        parent: "awesomecategory"
      }));

      expect(subcategory._id).toEqual("awesomecategory-subawesomecategory");
    });
  });

  describe("categoryService.update", () => {
    it("should update the existing category", async () => {
      await categoryService.create(new Category({
        _id: "awesomecategory",
        name: "Awesome Category",
        parent: null
      }));
      const category = await categoryService.update("awesomecategory", {name: "AWESOME"})
      expect(category._id).toEqual("awesomecategory");
      expect(category.name).toEqual("AWESOME");
    });
  });

  describe("categoryService.del", () => {
    it("should delete the category from the database", async () => {
      await categoryService.create(new Category({
        _id: "awesomecategory",
        name: "Awesome Category",
        parent: null
      }));

      await categoryService.del("awesomecategory");
      try {
        await db.get("awesomecategory");
        fail("Shouldn't get here");
      } catch (error) {
        expect(error.status).toEqual(404);
      }
    });

    it("should reset the transactions previously categorized", async () => {
      await categoryService.create(new Category({
        _id: "awesomecategory",
        name: "Awesome Category",
        parent: null
      }));
      await db.post(new Transaction({_id: "txn1", date: "2015-01-01", categoryId: "awesomecategory"}));
      await db.post(new Transaction({_id: "txn2", date: "1992-10-01", categoryId: "awesomecategory"}));
      await db.post(new Transaction({_id: "txn3", date: "1981-11-06", categoryId: "awesomecategory"}));

      await categoryService.del("awesomecategory");

      expect((await db.get("txn1")).categoryId).toBe(undefined);
      expect((await db.get("txn2")).categoryId).toBe(undefined);
      expect((await db.get("txn3")).categoryId).toBe(undefined);
    });

    it("should reset the parent of sub-categories", async () => {
      await categoryService.create(new Category({
        _id: "awesomecategory",
        name: "Awesome Category",
        parent: null
      }));
      await categoryService.create(new Category({
        _id: "cat-1",
        name: "Cat 1",
        parent: "awesomecategory"
      }));
      await categoryService.create(new Category({
        _id: "cat-2",
        name: "Cat 2",
        parent: "awesomecategory"
      }));

      await categoryService.del("awesomecategory");

      expect((await db.get("cat-1")).parent).toBe(undefined);
      expect((await db.get("cat-2")).parent).toBe(undefined);
    })
  });
});
