import * as PouchDB from "pouchdb";
import * as fs from "fs";

export const init = () => {
  const config = require("../config/config.json");

  PouchDB.plugin(require("pouchdb-adapter-node-websql"));
  PouchDB.plugin(require("pouchdb-find"));
  console.log(`NODE_ENV=${process.env.NODE_ENV}`);
  const db = new PouchDB(
    config[process.env.NODE_ENV || "development"].storage,
    {
      adapter: "websql"
    }
  );
  (<any>db).createIndex({
    index: {
      fields: ["metadata.docType"]
    }
  });
  return db;
};

export const reset = async () => {
  const config = require("../config/config.json");
  if (process.env.NODE_ENV === "production") {
    new Error(
      "Cannot reset the production database. Please manually reset it."
    );
  }

  const allDocs = await db.allDocs();
  allDocs.rows
    .filter(row => !(<any>row.id).startsWith("_design/"))
    .forEach(async row => {
      console.log(row);
      await db.remove(row.id, row.value.rev);
    });
};

export let db = init();
