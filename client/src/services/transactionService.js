// @flow
import PromiseFileReader from "promise-file-reader";
import Banking from "banking";
import Account from "../models/Account";
import Transaction from "../models/Transaction";
import { transactionTypes } from "../models/TransactionType";
import db from "../db";

const parseOfx = (fileContent) => {
  return new Promise((resolve, reject) => {
    Banking.parse(fileContent, (res) => {
      resolve(res);
    });
  });
}

export const importAccountStatement = async (account: Account, statementFile: File): Promise<{numImported: number, numSkipped: number}> => {
    const fileContent = await PromiseFileReader.readAsText(statementFile);
    const result = await parseOfx(fileContent);
    const stmttrns = result.body.OFX.BANKMSGSRSV1.STMTTRNRS.STMTRS.BANKTRANLIST.STMTTRN;
    const dbResult = stmttrns.map(async t => {
      const txn = new Transaction({
        accountId: account._id,
        amount: t.TRNAMT,
        date: t.DTPOSTED,
        name: t.NAME,
        memo: t.MEMO,
        type: parseFloat(t.TRNAMT) > 0 ? transactionTypes.DEBIT : transactionTypes.CREDIT
      })
      try {
        // Calculate checksum
        // Verify db does not contain such checksum
        // If checksum clash, throw error, otherwise, proceed to post
        await db.post(txn);
        // Update account with the new import
        // TODO: if performance becomes a problem, consider using service worker
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    });
    const resolvedResults = await Promise.all(dbResult);
    const numImported = resolvedResults.filter(r => r === true).length;
    const numSkipped = resolvedResults.filter(r => r === false).length;
    return { numImported, numSkipped };
}