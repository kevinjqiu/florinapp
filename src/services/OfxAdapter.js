// @flow

import Banking from "banking";
import Transaction from "../models/Transaction";
import { transactionTypes } from "../models/TransactionType";
import moment from "moment";

const OFX_TIME_FORMAT = "YYYYMMDDHHmmss.SSS";

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
        date: moment.utc(t.DTPOSTED, OFX_TIME_FORMAT).toJSON(),
        name: t.NAME,
        memo: t.MEMO,
        type:
          parseFloat(t.TRNAMT) > 0
            ? transactionTypes.DEBIT
            : transactionTypes.CREDIT
      });
    })
  }

  async getBalance(): Promise<{dateTime: string, amount: string}> {
    const ofxObject = await this.getOfxObject();
    const ledgerBalance = ofxObject.body.OFX.BANKMSGSRSV1.STMTTRNRS.STMTRS.LEDGERBAL;
    const dt = ledgerBalance.DTASOF;
    const matched = /([\d\.]+)\[([\d-]+).+\]/.exec(dt);
    const dtString = matched[1];
    const offset = parseInt(matched[2]) * 60;
    return {
      dateTime: moment.utc(dtString, OFX_TIME_FORMAT).utcOffset(offset).toJSON(),
      amount: ledgerBalance.BALAMT
    }
  }
}