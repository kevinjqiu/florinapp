import Metadata from "./Metadata";

// @flow

export default class FlorinBase {
  metadata: Metadata;

  constructor(type: string) {
    this.metadata = new Metadata(type);
  }
}