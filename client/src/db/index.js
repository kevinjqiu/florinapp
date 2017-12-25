import PouchDB from "pouchdb";
import PouchDBFind from "pouchdb-find";

PouchDB.plugin(PouchDBFind);
const db = new PouchDB("florin-test");

db.createIndex({
  index: {
    fields: ["metadata.type"]
  }
});

export default db;