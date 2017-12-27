import React, { Component } from "react";
import { Route } from "react-router-dom";
import AccountList from "./AccountList";
import AccountNew from "./AccountNew";
import AccountDetails from "./AccountDetails";

export default class Accounts extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <Route exact path="/accounts" component={AccountList} />
        <Route exact path="/accounts/new" component={AccountNew} />
        <Route exact path="/accounts/:accountId/view" component={AccountDetails} />
      </div>
    );
  }
}
