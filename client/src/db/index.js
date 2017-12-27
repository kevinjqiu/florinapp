import PouchDB from "pouchdb";
import PouchDBFind from "pouchdb-find";
import PouchDBMemoryAdapter from "pouchdb-adapter-memory";

let db;

const ENV = process.env.ENV;

PouchDB.plugin(PouchDBFind);
if (ENV === "test") {
  PouchDB.plugin(PouchDBMemoryAdapter);
  // PouchDB.debug.enable("*");
  db = new PouchDB("florin-test", { adapter: "memory" });
} else {
  // db = new PouchDB("florin-test", {adapter: "http"});
  db = new PouchDB("http://localhost:5984/florin");
}

db.createIndex({
  index: {
    fields: ["metadata.type"]
  }
});

export default db;
