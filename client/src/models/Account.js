// @flow
import type { AccountType } from "./AccountType";
import FlorinBase from "./FlorinBase";

export default class Account extends FlorinBase {
  _id: string;
  name: string;
  financialInstitution: string;
  type: AccountType;

  constructor(props: {name:string, financialInstitution:string, type:AccountType}) {
    super("Account");
    Object.assign(this, props);
  }
}