import * as express from "express";
import * as healthController from "./controllers/health";
import * as categoryController from "./controllers/category";
import * as accountController from "./controllers/account";
import { db } from "./db";
import { seed } from "./db/seed";

export default (app: express.Express) => {
  app.get("/api/v2/healthz", healthController.index);

  app.get("/api/v2/categories", async (req, resp) => {
    const result = await categoryController.search({});
    resp.send(result);
  });

  app.get("/api/v2/accounts", async (req, resp) => {
    const result = await accountController.search({});
    resp.send(result);
  });

  app.post("/api/v2/accounts", async (req: express.Request, resp) => {
    console.log(req.body);
    const { name, financialInstitution, type } = req.body;
    const accountPostRequest = new accountController.AccountPostRequest(name, financialInstitution, type);
    const account = await accountController.post(accountPostRequest);
    resp.status(201);
    resp.send(account);
  });

  app.post(
    "/api/v2/seed",
    async (req: express.Request, resp: express.Response): Promise<any> => {
      const responses: any = await Promise.all(
        seed().map(async doc => {
          try {
            let existingDoc: PouchDB.Core.GetMeta;
            try {
              existingDoc = await db.get(doc._id);
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
