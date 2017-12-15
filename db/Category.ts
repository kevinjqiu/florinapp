import * as PouchDB from "pouchdb";
import Metadata from './Metadata';

export default interface Category {
    metadata: Metadata
  id: string;
  name: string;
}
