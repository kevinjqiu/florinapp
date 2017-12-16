import { Response } from "express";
import app from "../index";
import { db, reset } from "../db";
import * as supertest from "supertest";
import * as assert from "assert";
import { newCategory } from "../db/Category";
import { newAccount, AccountType } from "../db/Account";
import CategoryDTO from "../dtos/Category";

beforeEach(async () => {
  await reset();
});

describe("Test health endpoint", () => {
  test("health endpoint should return 200", () => {
    const request = supertest(app);
    request.get("/api/v2/healthz").expect(200, { health: "ok" });
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
    expect(response.body).toEqual({ total: 0, result: [] });
  });

  test("GET /categories: Single category", async () => {
    db.post(newCategory("sample", "Sample Category"));
    const request = supertest(app);
    const response = await request.get("/api/v2/categories").expect(200);
    expect(response.body.total).toBe(1);
    expect(response.body.result[0].id).toBe("sample");
  });

  test("GET /categories: Nested categories", async () => {
    db.post(newCategory("automobile", "Automobile"));
    db.post(
      newCategory("automobile-insurance", "Automobile::Insurance", "automobile")
    );
    db.post(newCategory("bills", "Bills"));
    db.post(newCategory("bills-hydro", "Bills::Hydro", "bills"));
    db.post(newCategory("bills-internet", "Bills::Internet", "bills"));
    db.post(newCategory("mortgage", "Mortgage"));

    const request = supertest(app);
    const response = await request.get("/api/v2/categories").expect(200);
    const expected = [
      {
        id: "automobile",
        name: "Automobile",
        type: "EXPENSE",
        allowTransactions: true,
        subCategories: [
          {
            id: "automobile-insurance",
            name: "Automobile::Insurance",
            type: "EXPENSE",
            allowTransactions: true,
            subCategories: []
          }
        ]
      },
      {
        id: "bills",
        name: "Bills",
        type: "EXPENSE",
        allowTransactions: true,
        subCategories: [
          {
            id: "bills-hydro",
            name: "Bills::Hydro",
            type: "EXPENSE",
            allowTransactions: true,
            subCategories: []
          },
          {
            id: "bills-internet",
            name: "Bills::Internet",
            type: "EXPENSE",
            allowTransactions: true,
            subCategories: []
          }
        ]
      },
      {
        id: "mortgage",
        name: "Mortgage",
        type: "EXPENSE",
        allowTransactions: true,
        subCategories: []
      }
    ];
    expect(response.body.result).toEqual(expected);
  });
});

describe("Account endpoints", () => {
  test("GET /accounts: No accounts", async () => {
    const request = supertest(app);
    const response = await request.get("/api/v2/accounts").expect(200);
    expect(response.body).toEqual({ total: 0, result: [] });
  });

  test("GET /accounts: Multiple accounts", async () => {
    db.post(newAccount("Checking account", "TD", AccountType.CHECKING));
    db.post(newAccount("Credit card", "Tangerine", AccountType.CREDIT_CARD));
    const request = supertest(app);
    const response = await request.get("/api/v2/accounts").expect(200);
    expect(response.body.total).toEqual(2);
    expect(response.body.result.map((r: any) => r.name).sort()).toEqual([
      "Checking account",
      "Credit card"
    ]);
  });
});
