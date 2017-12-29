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
  db = new PouchDB("florin-test");
  // db = new PouchDB("http://localhost:5984/florin");
}

if (DEBUG) {
  PouchDB.debug.enable("*");
}

const setupIndex = async db => {
  const indexes = [
    { index: { fields: ["metadata.type"] } }
  ];

  await Promise.all(indexes.map(async index => {
    await db.createIndex(index);
    console.log(`Created index ${JSON.stringify(index)}`);
  }))
};

setupIndex(db);

export default db;
