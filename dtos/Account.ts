import { AccountType, Account } from "../db/Account";

export default class AccountDTO {
  id: string;
  name: string;
  financialInstitution: string;
  type: AccountType;

  constructor(account: Account) {
    const { _id, name, financialInstitution, type } = account;
    this.id = _id;
    this.name = name;
    this.financialInstitution = financialInstitution;
    this.type = type;
  }
}
