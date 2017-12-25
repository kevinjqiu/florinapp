// @flow
export const accountTypes = {
  CHECKING: "CHECKING",
  SAVINGS: "SAVINGS",
  INVESTMENT: "INVESTMENT",
  CREDIT_CARD: "CREDIT_CARD"
}
export type AccountType = $Keys<typeof accountTypes>;