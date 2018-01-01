import moment from "moment";

export default class DateRange {
  start: moment.moment;
  end: moment.moment;
  display: string;
  normalizedDisplay: string;

  constructor(obj) {
    Object.assign(this, obj);
    this.setNormalizedDisplay();
  }

  setNormalizedDisplay() {
    this.normalizedDisplay = `from ${this.start.format(
      "MMM DD, YYYY"
    )} to ${this.end.format("MMM DD, YYYY")}`;
  }
}
