import db from "../db";
import reset from "../db/reset";
import Settings from "../models/Settings";
import * as settingsService from "./settingsService";

describe("fetch", () => {
  beforeEach(async () => {
    await reset();
  });

  it("should return the settings object", async () => {
    await db.put(new Settings({}));
    const settings = await settingsService.fetch();
    expect(settings.locale).toEqual("en_US");
  });

  it("should generate a new settings object if not found", async () => {
    const settings = await settingsService.fetch();
    expect(settings.locale).toEqual("en_US");
  });
});

describe("update", () => {
  beforeEach(async () => {
    await reset();
  });

  it("should update", async () => {
    await db.put(new Settings({}));
    const settings = await settingsService.fetch();
    settings.locale = "en_GB";
    await settingsService.update(settings);
    const updatedSettings = await settingsService.fetch();
    expect(updatedSettings.locale).toEqual("en_GB");
  });
})