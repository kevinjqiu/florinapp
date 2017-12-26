// @flow
import Metadata from "./Metadata";

export default class FlorinBase {
  metadata: Metadata;

  constructor(type: string) {
    this.metadata = new Metadata(type);
  }
}