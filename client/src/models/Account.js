// @flow
import { AccountType } from "./AccountType";
import Metadata from "./Metadata";

export default class Account {
  _id: string;
  metadata: Metadata;
  name: string;
  financialInstitution: string;
  type: AccountType;

  construct(props) {
    console.log(props);
    const { name, financialInstitution, type } = props;
    this.name = name;
    this.financialInstitution = financialInstitution;
    this.type = type;
    this.metadata = new Metadata("Account");
  }
}