import Account from "../models/Account";
import db from "../db";
import { MAX_NUMBER } from "./const";

export const fetch = async (): Promise<Array<Account>> => {
  const response = await db.find({
    selector: { "metadata.type": "Account" },
    limit: MAX_NUMBER
  });
  return response.docs.map(doc => new Account(doc));
};

export const del = async (accountId: string) => {
  const doc = await db.get(accountId);
  await db.remove(doc);
};

export const create = async (accountData: Account): Promise<Account> => {
  const response = await db.post(accountData);
  return new Account(response.account);
};

export const fetchById = async (accountId: Account): Promise<Account> => {
  const account = await db.get(accountId);
  return new Account(account);
};

export const update = async (accountId: string, accountData: Account): Promise<Account> => {
  let account = {
    ...(await db.get(accountId)),
    ...accountData
  };
  await db.put(account);
  return await fetchById(accountId);
};
