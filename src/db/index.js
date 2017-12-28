import PouchDB from "pouchdb";
import PouchDBFind from "pouchdb-find";
import PouchDBMemoryAdapter from "pouchdb-adapter-memory";

let db;

const { ENV, DEBUG } = process.env;

PouchDB.plugin(PouchDBFind);
if (ENV === "test") {
  PouchDB.plugin(PouchDBMemoryAdapter);
  // db = new PouchDB("florin-test", { adapter: "memory" });
  db = new PouchDB("florin-test", { adapter: "memory" });
} else {
  // db = new PouchDB("florin-test");
  db = new PouchDB("http://localhost:5984/florin");
}

if (DEBUG) {
  PouchDB.debug.enable("*");
}

const setupIndex = async (db) => {
  await db.createIndex({
    index: {
      fields: ["metadata.type"]
    }
  });

  await db.createIndex({
    index: {
      fields: ["date"]
    }
  });
};

setupIndex(db);

export default db;
