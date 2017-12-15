import * as PouchDB from 'pouchdb';

const config = require('../config/config.json');

PouchDB.plugin(require('pouchdb-adapter-node-websql'));
const db = new PouchDB(config[process.env.NODE_ENV || 'development'].storage, {adapter: 'websql'});
export default db;