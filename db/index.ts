import * as PouchDB from "pouchdb";

const config = require("../config/config.json");

PouchDB.plugin(require("pouchdb-adapter-node-websql"));
PouchDB.plugin(require("pouchdb-find"));
const db = new PouchDB(config[process.env.NODE_ENV || "development"].storage, {
  adapter: "websql"
});
(<any>db).createIndex({
  index: {
    fields: ["metadata.docType"]
  }
});
export default db;
