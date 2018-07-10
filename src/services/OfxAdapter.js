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

  getStatement(ofxObject) {
    let bankTranList = {};
    if ('BANKMSGSRSV1' in ofxObject.body.OFX) {
      return ofxObject.body.OFX.BANKMSGSRSV1.STMTTRNRS.STMTRS;
    } else if ('CREDITCARDMSGSRSV1' in ofxObject.body.OFX) {
      return ofxObject.body.OFX.CREDITCARDMSGSRSV1.CCSTMTTRNRS.CCSTMTRS;
    } else {
      console.log('POSSIBLY MALFORMED OFX FILE!!!');
      return {};
    }
  }

  async getTransactions(account: {_id: string}): Promise<Array<Transaction>> {
    const ofxObject = await this.getOfxObject();
    const stmttrns = this.getStatement(ofxObject).BANKTRANLIST.STMTTRN || [];
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
    const ledgerBalance = this.getStatement(ofxObject).LEDGERBAL;
    const dt = ledgerBalance.DTASOF;
    // TODO: doesn't work for Rogers Bank's new OFX format
    // <DTASOF>20180710174252
    const matched = /([\d.]+)\[([\d-]+).+\]/.exec(dt);
    const dtString = matched[1];
    const offset = parseInt(matched[2], 10) * 60;
    return {
      dateTime: moment.utc(dtString, OFX_TIME_FORMAT).utcOffset(offset).toJSON(),
      amount: ledgerBalance.BALAMT
    }
  }
}