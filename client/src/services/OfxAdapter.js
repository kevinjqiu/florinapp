// @flow

import Banking from "banking";
import Transaction from "../models/Transaction";
import { transactionTypes } from "../models/TransactionType";
import moment from "moment";

const OFX_TIME_FORMAT = "YYYYMMDDHHmmss.SSS";
const OFX_TIME_FORMAT_WITH_TZ = "";

export default class OfxAdapter {
  rawFileContent: string;
  ofxObject: {};

  constructor(fileContent: string) {
    this.rawFileContent = fileContent;
  }

  async parse(): Promise<{}> {
    return new Promise((resolve, reject) => {
      Banking.parse(this.rawFileContent, res => {
        resolve(res);
      });
    });
  };

  async getOfxObject(): Promise<{}> {
    if (this.ofxObject === undefined) {
      this.ofxObject = await this.parse();
    }
    return this.ofxObject;
  }

  async getTransactions(account: {_id: string}): Promise<Array<Transaction>> {
    const ofxObject = await this.getOfxObject();
    const stmttrns = ofxObject.body.OFX.BANKMSGSRSV1.STMTTRNRS.STMTRS.BANKTRANLIST.STMTTRN || [];
    return stmttrns.map(t => {
      return new Transaction({
        accountId: account._id,
        amount: t.TRNAMT,
        date: moment(t.DTPOSTED, OFX_TIME_FORMAT).format(),
        name: t.NAME,
        memo: t.MEMO,
        type:
          parseFloat(t.TRNAMT) > 0
            ? transactionTypes.DEBIT
            : transactionTypes.CREDIT
      });
    })
  }
}