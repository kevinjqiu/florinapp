// @flow
import db from "../db";
import Sync from "../models/Sync";

const DEFAULT_SYNC_OPTIONS = { live: true, retry: true };
export const SYNC_KEY = "florin-syncs";

export const create = (
  sync: Sync,
  localStorage: Storage = window.localStorage
) => {
  const syncs = fetch(localStorage);
  const existingRemotes = new Set(syncs.map(sync => sync.remote));
  if (existingRemotes.has(sync.remote)) {
    throw { error: "The sync target is already setup" };
  }
  syncs.push(sync);
  localStorage.setItem(SYNC_KEY, JSON.stringify(syncs));
};

export const fetch = (
  localStorage: Storage = window.localStorage
): Array<Sync> => {
  const raw = localStorage.getItem(SYNC_KEY) || "[]";
  return JSON.parse(raw).map(s => new Sync(s));
};

export const del = (
  sync: Sync,
  localStorage: Storage = window.localStorage
) => {
  const syncs = fetch(localStorage).filter(s => sync.remote !== s.remote);
  localStorage.setItem(SYNC_KEY, JSON.stringify(syncs));
};

export const start = (
  sync: Sync,
  localStorage: Storage = window.localStorage
) => {
  return db.sync(sync.remote, DEFAULT_SYNC_OPTIONS);
};

export const save = (
  syncs: Array<Sync>,
  localStorage: Storage = window.localStorage
) => {
  localStorage.setItem(SYNC_KEY, JSON.stringify(syncs));
};