import app from "../index";
import { db, init } from "../db";
import * as supertest from "supertest";

beforeEach(() => {
    init();
});

afterEach(async () => {
    const allDocs = await db.allDocs();
    allDocs.rows.forEach(row => {
       db.remove(<any>row);
    });
});

test("health endpoint should return 200", () => {
    const request = supertest(app);
    request.get("/api/v2/healthz").expect(200);
});

test("seed", () => {
    const request = supertest(app);
    request.post("/api/v2/seed").expect(200);
});