import * as express from "express";
import * as healthController from "./controllers/health";
import * as categoryController from "./controllers/category";
import db from "./db";
import { seed } from "./db/seed";

export default (app: express.Express) => {
  // Routes
  app.get("/api/v2/healthz", healthController.index);
  app.get("/api/v2/categories", categoryController.index);
  app.post(
    "/api/v2/seed",
    async (req: express.Request, resp: express.Response): Promise<any> => {
      const responses: any = await Promise.all(
        seed().map(async doc => {
          try {
            let existingDoc: PouchDB.Core.GetMeta;
            try {
              const existingDoc = await db.get(doc._id);
              console.log("Document exists. Updating...");
              (<any>doc)._rev = existingDoc._rev;
            } catch (error) {
              if (error.status != 404) {
                throw error;
              }
              console.log("Document does not exist. Creating...");
            }
            const response = await db.put(doc);
            return await db.get(response.id);
          } catch (error) {
            return { doc: doc, error };
          }
        })
      );
      resp.send(responses);
    }
  );
};
