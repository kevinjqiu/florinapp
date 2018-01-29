import React from "react";
import * as currencyFormatter from "currency-formatter";
const Decimal = require('decimal.js/decimal.min');

export default ({amount, code}) => {
  const numAmount = new Decimal(amount);
  const color = numAmount < 0 ? "red" : "green";
  return <span style={{color}}>{currencyFormatter.format(amount, {code})}</span>
};