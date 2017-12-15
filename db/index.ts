import * as PouchDB from "pouchdb";

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

export const db = init();