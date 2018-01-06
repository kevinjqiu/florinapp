import PouchDB from "pouchdb";
import PouchDBFind from "pouchdb-find";
import PouchDBMemoryAdapter from "pouchdb-adapter-memory";
import { setupIndex, setupViews } from "./setup";

let db;

const { ENV, DEBUG } = process.env;

PouchDB.plugin(PouchDBFind);
if (ENV === "test") {
  PouchDB.plugin(PouchDBMemoryAdapter);
  // db = new PouchDB("florin-test", { adapter: "memory" });
  db = new PouchDB("florin-test", { adapter: "memory" });
} else {
  db = new PouchDB("florin-test");
  // db = new PouchDB("http://localhost:5984/florin");
}

if (DEBUG) {
  PouchDB.debug.enable("*");
}

setupIndex(db);
setupViews(db);

// const target = new PouchDB("http://localhost:5984/florin");
// db.sync(target);
export default db;
