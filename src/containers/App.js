import React, { Component } from "react";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import { Container } from "reactstrap";
import { Switch, Route, Redirect } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import Accounts from "../views/Accounts/Accounts";
import Transactions from "../views/Transactions/Transactions";
import { connect } from "react-redux";
import * as actions from "../actions";
import GlobalModal from "../components/GlobalModal/GlobalModal";
import Notifications from "react-notification-system-redux";

class App extends Component {
  render() {
    const { notifications } = this.props;
    return (
      <div className="app">
        <Header />
        <div className="app-body">
          <Sidebar {...this.props} />
          <main className="main">
            <Breadcrumb />
            <Container fluid>
              <Switch>
                <Route path="/accounts" component={Accounts} />
                <Route path="/transactions" component={Transactions} />
                <Redirect from="/" to="/dashboard" />
              </Switch>
            </Container>
          </main>
        </div>
        <GlobalModal />
        <Notifications notifications={notifications} />
      </div>
    );
  }
}

const mapStateToProps = ({ notifications }) => {
  return { notifications };
};

export default connect(mapStateToProps, actions)(App);
