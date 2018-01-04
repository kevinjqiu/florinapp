// @flow
import type { SyncStatus } from "./SyncStatus";

export default class Sync {
  remote: string;
  status: SyncStatus

  constructor(props: {}) {
    Object.assign(this, props);
  }
}
