// @flow

export const categoryTypes = {
  EXPENSE: "EXPENSE",
  INCOME: "INCOME",
  TRANSFER: "TRANSFER"
};
export type CategoryType = $Keys<typeof categoryTypes>;