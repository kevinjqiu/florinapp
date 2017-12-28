import React from "react";
import moment from "moment";

const Date = ({date}) => {
  console.log(date);
  const humanizedDate = moment.utc(date).calendar();
  console.log(humanizedDate);
  return <span>{humanizedDate}</span>;
}

export default Date;