import PouchDB from "pouchdb";
import PouchDBFind from "pouchdb-find";
import PouchDBMemoryAdapter from "pouchdb-adapter-memory";

let db;

const { ENV, DEBUG } = process.env;

PouchDB.plugin(PouchDBFind);
if (ENV === "test") {
  PouchDB.plugin(PouchDBMemoryAdapter);
  db = new PouchDB("florin-test", { adapter: "memory" });
} else {
  // db = new PouchDB("florin-test", {adapter: "http"});
  db = new PouchDB("http://localhost:5984/florin");
}

if (DEBUG) {
  PouchDB.debug.enable("*");
}

db.createIndex({
  index: {
    fields: ["metadata.type"]
  }
});

db.createIndex({
  index: {
    fields: ["date"]
  }
});

export default db;
