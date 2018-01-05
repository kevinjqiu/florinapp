import React from "react";
import moment from "moment";

const Date = ({ date }) => {
  const humanizedDate = moment.utc(date).calendar(null, {
    sameDay: "[Today]",
    nextDay: "[Tomorrow]",
    nextWeek: "[Next] dddd",
    lastDay: "[Yesterday]",
    lastWeek: "dddd",
    sameElse: "DD/MM/YYYY"
  });
  return <span>{humanizedDate}</span>;
};

export default Date;
