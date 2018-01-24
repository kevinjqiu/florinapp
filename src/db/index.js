import PouchDB from "pouchdb";
import PouchDBFind from "pouchdb-find";
import PouchDBMemoryAdapter from "pouchdb-adapter-memory";
import { setupIndex, setupViews } from "./setup";
import config from "../config";

PouchDB.plugin(PouchDBFind);

const fromConfig = ({ dbadapter, dbname, dbdebug }) => {
  let db;
  if (dbdebug) {
    PouchDB.debug.enable("*");
  }

  if (dbadapter === "memory") {
    PouchDB.plugin(PouchDBMemoryAdapter);
  }

  db = new PouchDB(dbname, { adapter: dbadapter });

  setupIndex(db);
  setupViews(db);

  return db;
}

export default fromConfig(config);
