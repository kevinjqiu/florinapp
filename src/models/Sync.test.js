import Sync from "./Sync";

describe("Sync", () => {
  describe("Sync.getRedactedRemoteUrl", () => {
    it("should return as is if the url does not contain passwords", () => {
      const sync = new Sync({ remote: "http://localhost:5984/remote" });
      expect(sync.getRedactedRemoteUrl()).toEqual(
        "http://localhost:5984/remote"
      );
    });

    it("should not redact when only user is specified", () => {
      const sync = new Sync({ remote: "http://admin@localhost:5984/remote" });
      expect(sync.getRedactedRemoteUrl()).toEqual(
        "http://admin@localhost:5984/remote"
      );
    });

    it("should redact both user and password are specified", () => {
      const sync = new Sync({ remote: "http://admin:password@localhost:5984/remote" });
      expect(sync.getRedactedRemoteUrl()).toEqual(
        "http://admin:****@localhost:5984/remote"
      );
    });
  });
});
