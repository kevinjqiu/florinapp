import * as express from "express";
import * as healthController from "./controllers/health";
import db from "./db";
import Category from './db/Category';

const app = express();
app.set("port", process.env.PORT || 5000);

// Routes
app.get("/api/v2/healthz", healthController.index);
app.get("/api/v2/test", async (req, resp): Promise<any> => {
  const category: Category = { metadata: { docType: "category" }, id: "income", name: "income" };
  const response = await db.post(category);
  resp.send(await db.get(response.id));
});
app.listen(app.get("port"), () => {
  console.log(`Server listening on ${app.get("port")}`);
});
