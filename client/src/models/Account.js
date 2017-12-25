import { AccountType } from "./AccountType";

// @flow
export default class Account {
  _id: string;
  name: string;
  financialInstitution: string;
  type: AccountType;

}