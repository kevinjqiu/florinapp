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
    const { name, financialInstitution, type } = props;
    this.name = name;
    this.financialInstitution = financialInstitution;
    this.type = type;
  }
}