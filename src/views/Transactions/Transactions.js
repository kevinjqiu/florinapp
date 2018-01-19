import React, { Component } from "react";
import { Route } from "react-router-dom";
import TransactionList from "./TransactionList";
import TransactionNew from "./TransactionNew";
import TransactionDetails from "./TransactionDetails";

export default class Transactions extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <Route exact path="/transactions" component={TransactionList} />
        <Route exact path="/transactions/new" component={TransactionNew} />
        <Route exact path="/transactions/:transactionId/view" component={TransactionDetails} />
      </div>
    );
  }
}
