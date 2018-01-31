// @flow
import db from "../db"
import Settings from "../models/Settings";

export const fetch = async ():Promise<Settings> => {
  try {
    const doc = await db.get("settings");
    return new Settings(doc);
  } catch (error) {
    const settings = new Settings({});
    await db.put(settings);
    return settings;
  }
}

export const update = async (settings: Settings) => {
  await db.put(settings);
}