// @flow
import type { SyncStatus } from "./SyncStatus";

export default class Sync {
  remote: string;
  status: SyncStatus

  constructor(props: {}) {
    Object.assign(this, props);
  }

  getRedactedRemoteUrl() {
    const url = new URL(this.remote);
    if (url.password) {
      url.password = "****";
    }
    return url.toString();
  }
}
