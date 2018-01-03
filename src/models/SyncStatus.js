// @flow
export const syncStatuses = {
  ACTIVE: "ACTIVE",
  FAILED: "FAILED",
  CANCELED: "CANCELED"
};
export type SyncStatus = $Keys<typeof syncStatuses>;
