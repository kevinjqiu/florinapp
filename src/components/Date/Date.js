import React from "react";
import moment from "moment";

const Date = ({ date }) => {
  const humanizedDate = moment.utc(date).calendar();
  return <span>{humanizedDate}</span>;
};

export default Date;
