import { Response } from "express";
import app from "../index";
import { db, reset } from "../db";
import * as supertest from "supertest";
import * as assert from "assert";
import { newCategory } from "../db/Category";

beforeEach(async () => {
    await reset();
});

describe("Test health endpoint", () => {
  test("health endpoint should return 200", () => {
    const request = supertest(app);
    request.get("/api/v2/healthz").expect(200, {health: "ok"});
  });
});

describe("Test seeding", () => {
  test("seeding is successful", () => {
    const request = supertest(app);
    request.post("/api/v2/seed").expect(200);
  });
});

describe("Category endpoints", () => {
  test("GET /categories: No categories", async () => {
      const request = supertest(app);
      const response = await request.get("/api/v2/categories").expect(200);
      assert.deepEqual(response.body, {total: 0, result: []});
  });

  test("GET /categories: Single category", async () => {
      db.post(newCategory("sample", "Sample Category"));
      const request = supertest(app);
      const response = await request.get("/api/v2/categories").expect(200);
      assert.equal(response.body.total, 1);
      assert.equal(response.body.result[0]._id, "sample");
  });
});
