import React, { Component } from "react";
import { Route } from "react-router-dom";
import TransactionList from "./TransactionList";

export default class Transactions extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <Route exact path="/transactions" component={TransactionList} />
      </div>
    );
  }
}
