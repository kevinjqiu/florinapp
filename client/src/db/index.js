import PouchDB from "pouchdb";
import PouchDBFind from "pouchdb-find";
import PouchDBMemoryAdapter from "pouchdb-adapter-memory";

let db;

const ENV = process.env.ENV;

PouchDB.plugin(PouchDBFind);
if (ENV === "test") {
  PouchDB.plugin(PouchDBMemoryAdapter);
  db = new PouchDB("florin-test", {adapter: "memory"});
} else {
  db = new PouchDB("florin-test");
}

db.createIndex({
  index: {
    fields: ["metadata.type"]
  }
});

export default db;