import moment from "moment";
import DateRange from "./DateRange";

export const thisMonth = now => {
  if (!now) now = moment.utc();
  const start = moment({
    year: now.year(),
    month: now.month(),
    day: 1
  });
  const end = start.clone();
  end.add(moment.duration(1, "months"));
  end.subtract(moment.duration(1, "days"));
  return new DateRange({
    start,
    end,
    display: `This month (${start.format("MMM")})`
  });
};

export const lastMonth = now => {
  if (!now) now = moment.utc();
  now = moment({
    year: now.year(),
    month: now.month(),
    day: 1
  });
  const start = now.clone();
  start.subtract(moment.duration(1, "months"));
  const end = start.clone();
  end.add(moment.duration(1, "months"));
  end.subtract(moment.duration(1, "days"));
  return new DateRange({
    start,
    end,
    display: `Last month (${start.format("MMM")})`
  });
};

export const twoMonthsAgo = now => {
  if (!now) now = moment.utc();
  now = moment({
    year: now.year(),
    month: now.month(),
    day: 1
  });
  const start = now.clone();
  start.subtract(moment.duration(2, "months"));
  const end = start.clone();
  end.add(moment.duration(1, "months"));
  end.subtract(moment.duration(1, "days"));
  return new DateRange({
    start,
    end,
    display: start.format("MMM YYYY")
  });
};

export const threeMonthsAgo = now => {
  if (!now) now = moment.utc();
  now = moment({
    year: now.year(),
    month: now.month(),
    day: 1
  });
  const start = now.clone();
  start.subtract(moment.duration(3, "months"));
  const end = start.clone();
  end.add(moment.duration(1, "months"));
  end.subtract(moment.duration(1, "days"));
  return new DateRange({
    start,
    end,
    display: start.format("MMM YYYY")
  });
};

export const thisYear = now => {
  if (!now) now = moment.utc();
  const start = moment({
    year: now.year(),
    month: 0,
    day: 1
  });
  const end = start.clone();
  end.add(moment.duration(1, "years"));
  end.subtract(moment.duration(1, "days"));
  return new DateRange({
    start,
    end,
    display: "This year"
  });
};

export const lastYear = now => {
  if (!now) now = moment.utc();
  const start = moment({
    year: now.year() - 1,
    month: 0,
    day: 1
  });
  const end = start.clone();
  end.add(moment.duration(1, "years"));
  end.subtract(moment.duration(1, "days"));
  return new DateRange({
    start,
    end,
    display: "Last year"
  });
}