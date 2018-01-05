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
});
