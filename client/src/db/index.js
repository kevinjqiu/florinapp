import PouchDB from "pouchdb";
import PouchDBFind from "pouchdb-find";
import PouchDBMemoryAdapter from "pouchdb-adapter-memory";

PouchDB.plugin(PouchDBFind);
PouchDB.plugin(PouchDBMemoryAdapter);
const db = new PouchDB("florin-test", {adapter: "memory"});

db.createIndex({
  index: {
    fields: ["metadata.type"]
  }
});

export default db;