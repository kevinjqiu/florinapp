import React from "react";
import * as currencyFormatter from "currency-formatter";

export default ({amount, code}) => {
  const numAmount = parseFloat(amount);
  const color = numAmount < 0 ? "red" : "green";
  return <span style={{color}}>{currencyFormatter.format(amount, {code})}</span>
};