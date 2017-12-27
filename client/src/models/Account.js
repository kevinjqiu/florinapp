// @flow
import type { AccountType } from "./AccountType";
import FlorinBase from "./FlorinBase";

class AccountHistory {
  dateTime: string;
  balance: string;

  constructor(props: {dateTime: string, balance: string}) {
    Object.assign(this, props);
  }
}

export default class Account extends FlorinBase {
  _id: string;
  name: string;
  financialInstitution: string;
  type: AccountType;
  history: Array<AccountHistory>;

  constructor(props: {name:string, financialInstitution:string, type:AccountType}) {
    super("Account");
    Object.assign(this, props);
  }

  addAccountBalanceRecord(dateTime: string, balance: string) {
    this.history = this.history || [];
    this.history.push(new AccountHistory({dateTime, balance}));
  }
}