import FlorinBase from "./FlorinBase";

export enum AccountType {
  CHECKING = "CHECKING",
  SAVINGS = "SAVINGS",
  CREDIT_CARD = "CREDIT_CARD",
  INVESTMENT = "INVESTMENT"
}

export interface Account extends FlorinBase {
  name: string;
  financialInstitution: string;
  type: AccountType;
}

export const newAccount = (
  name: string,
  financialInstitution: string,
  type: AccountType
): Account => {
  return {
    metadata: { docType: "account" },
    _id: undefined,
    name,
    financialInstitution,
    type
  };
};
