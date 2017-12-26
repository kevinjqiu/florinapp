// @flow

export const transactionTypes = {
  DEBIT: "DEBIT",
  CREDIT: "CREDIT"
};

export type TransactionType = $Keys<typeof transactionTypes>;