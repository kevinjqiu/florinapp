// @flow

import FlorinBase from "./FlorinBase";

export default class Settings extends FlorinBase {
  _id: string;
  locale: string;

  constructor(props: {}) {
    super("Settings");
    this._id = "settings";
    this.locale = "en_US";
    Object.assign(this, props);
  }
}