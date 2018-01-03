// @flow
import db from "../db";
import Sync from "../models/Sync";

const SYNC_KEY = "florin-syncs";

export const create = (sync: Sync) => {
  const syncs = fetch();
  // TODO: make sure remote are unique
  syncs.push(sync)
  localStorage.setItem(SYNC_KEY, JSON.stringify(syncs));
}

export const fetch = (): Array<Sync> => {
  const raw = localStorage.getItem(SYNC_KEY) || "[]";
  return JSON.parse(raw);
}