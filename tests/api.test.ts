import app from "../index";
import * as supertest from "supertest";

test("health endpoint should return 200", () => {
    const request = supertest(app);
    request.get("/api/v2/healthz").expect(200);
});

test("seed", () => {
    const request = supertest(app);
    request.post("/api/v2/seed").expect(200);
});