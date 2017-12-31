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
    const newEnd = this.end.clone();
    newEnd.subtract(1, "days");
    this.normalizedDisplay = `${this.start.format(
      "MMM DD, YYYY"
    )} to ${newEnd.format("MMM DD, YYYY")}`;
  }
}
