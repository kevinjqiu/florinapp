import * as syncService from "./syncService";
import LocalStorage from "node-localstorage";

const localStorage = new LocalStorage.LocalStorage("./tmp");
const reset = () => {
  localStorage.setItem(syncService.SYNC_KEY, "");
};

describe("syncService.fetch", () => {
  beforeEach(() => {
    reset();
  });

  it("should return empty result when no sync is there", () => {
    const syncs = syncService.fetch(localStorage);
    expect(syncs).toEqual([]);
  });

  it("should return deserialized sync objects", () => {
    localStorage.setItem(
      syncService.SYNC_KEY,
      `[{"remote": "http://localhost:5984/test"}, {"remote": "https://admin:password@example.com/db"}]`
    );
    const syncs = syncService.fetch(localStorage);
    expect(syncs).toEqual([
      {
        remote: "http://localhost:5984/test"
      },
      {
        remote: "https://admin:password@example.com/db"
      }
    ]);
  });
});

describe("syncService.create", () => {
  beforeEach(() => {
    reset();
  });

  it("should create new syncs", () => {
    syncService.create({ remote: "http://localhost/foo" }, localStorage);
    const syncs = syncService.fetch(localStorage);
    expect(syncs).toEqual([{ remote: "http://localhost/foo" }]);
  });

  it("should not create new syncs when remote already exists", () => {
    syncService.create({ remote: "http://localhost/foo" }, localStorage);
    expect(() =>
      syncService.create({ remote: "http://localhost/foo" }, localStorage)
    ).toThrow();
  });
});

describe("syncService.del", () => {
  beforeEach(() => {
    reset();
  });

  it("should do nothing if remote url does not match anything", () => {
    syncService.create({ remote: "http://localhost/foo" }, localStorage);
    syncService.del({ remote: "http://localhost/bar" }, localStorage);
    const syncs = syncService.fetch(localStorage);
    expect(syncs).toEqual([{remote: "http://localhost/foo"}]);
  })

  it("should delete existing sync config", () => {
    syncService.create({ remote: "http://localhost/foo" }, localStorage);
    syncService.del({ remote: "http://localhost/foo" }, localStorage);
    const syncs = syncService.fetch(localStorage);
    expect(syncs).toEqual([]);
  });
})