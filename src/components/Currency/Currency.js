import React from "react";
import * as currencyFormatter from "currency-formatter";

export default ({amount, code}) => {
  return <span>{currencyFormatter.format(amount, {code})}</span>
};