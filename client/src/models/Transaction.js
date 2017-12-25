import FlorinBase from "./FlorinBase";

// @flow
export class Transaction extends FlorinBase {
  _id: string;

  constructor(props: {}) {
    super("Transaction");
  }
}