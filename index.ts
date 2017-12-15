import * as express from "express";
import * as healthController from "./controllers/health";
import db from "./db";
import { seed } from "./db/Category";

const app = express();
app.set("port", process.env.PORT || 5000);

// Routes
app.get("/api/v2/healthz", healthController.index);
app.get("/api/v2/seed", async (req, resp): Promise<any> => {
  const responses: any = await Promise.all(
    seed().map(async category => {
      try {
        const response = await db.put(category);
        return await db.get(response.id);
      } catch (error) {
        return {doc: category, error}
      }
    })
  );
  resp.send(responses);
});
app.listen(app.get("port"), () => {
  console.log(`Server listening on ${app.get("port")}`);
});
