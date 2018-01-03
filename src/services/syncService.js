// @flow
import db from "../db";
import Sync from "../models/Sync";

export const SYNC_KEY = "florin-syncs";

export const create = (sync: Sync, localStorage: Storage =window.localStorage) => {
  const syncs = fetch(localStorage);
  // TODO: make sure remote are unique
  syncs.push(sync)
  localStorage.setItem(SYNC_KEY, JSON.stringify(syncs));
}

export const fetch = (localStorage: Storage = window.localStorage): Array<Sync> => {
  const raw = localStorage.getItem(SYNC_KEY) || "[]";
  return JSON.parse(raw);
}