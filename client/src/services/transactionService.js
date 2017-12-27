// @flow
import PromiseFileReader from "promise-file-reader";
import Banking from "banking";
import Account from "../models/Account";
import Transaction from "../models/Transaction";
import { transactionTypes } from "../models/TransactionType";
import db from "../db";

export const saveNewTransaction = async (transaction: Transaction) => {
  // Verify db does not contain such checksum
  // If checksum clash, throw error, otherwise, proceed to post
  const response = await db.find({
    selector: {
      "metadata.type": {
        $eq: "Transaction"
      },
      checksum: {
        $eq: transaction.checksum
      }
    }
  });
  if (response.docs.length !== 0) {
    throw { error: "Transaction is already imported" };
  }
  await db.post(transaction);
};

export const importAccountStatement = async (
  account: Account,
  statementFile: File
): Promise<{ numImported: number, numSkipped: number }> => {
  const parseOfx = fileContent => {
    return new Promise((resolve, reject) => {
      Banking.parse(fileContent, res => {
        resolve(res);
      });
    });
  };

  const fileContent = await PromiseFileReader.readAsText(statementFile);
  const result = await parseOfx(fileContent);
  const stmttrns =
    result.body.OFX.BANKMSGSRSV1.STMTTRNRS.STMTRS.BANKTRANLIST.STMTTRN || [];
  const dbPromises = stmttrns.map(async t => {
    const txn = new Transaction({
      accountId: account._id,
      amount: t.TRNAMT,
      date: t.DTPOSTED,
      name: t.NAME,
      memo: t.MEMO,
      type:
        parseFloat(t.TRNAMT) > 0
          ? transactionTypes.DEBIT
          : transactionTypes.CREDIT
    });
    try {
      await saveNewTransaction(txn);
      // Update account with the new import
      // TODO: if performance becomes a problem, consider using service worker
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  });
  const resolvedResults = await Promise.all(dbPromises);
  // const numImported = dbResult.filter(r => r === true).length || 0;
  // const numSkipped = dbResult.filter(r => r === false).length || 0;
  // return { numImported, numSkipped };
  console.log(resolvedResults);
  const numImported = resolvedResults.filter(r => r === true).length;
  const numSkipped = resolvedResults.filter(r => r === false).length;
  return { numImported, numSkipped };
};
