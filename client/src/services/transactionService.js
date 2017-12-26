// @flow
import PromiseFileReader from "promise-file-reader";
import Banking from "banking";
import Account from "../models/Account";
import Transaction from "../models/Transaction";
import { transactionTypes } from "../models/TransactionType";

const parseOfx = (fileContent) => {
  return new Promise((resolve, reject) => {
    Banking.parse(fileContent, (res) => {
      resolve(res);
    });
  });
}

export const importAccountStatement = async (account: Account, statementFile: File) => {
    const fileContent = await PromiseFileReader.readAsText(statementFile);
    const result = await parseOfx(fileContent);
    result.body.OFX.BANKMSGSRSV1.STMTTRNRS.STMTRS.BANKTRANLIST.STMTTRN.forEach(t => {
      const txn = new Transaction({
        accountId: account._id,
        amount: t.TRNAMT,
        date: t.DTPOSTED,
        name: t.NAME,
        memo: t.MEMO,
        type: parseFloat(t.TRNAMT) > 0 ? transactionTypes.DEBIT : transactionTypes.CREDIT
      })
      console.log(t);
      console.log(txn);
    });
}