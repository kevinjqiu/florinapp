import React, { Component } from "react";
import { connect } from "react-redux";
import TransactionListAside from "./TransactionListAside";

const AsideContent = ({ location }) => {
  if (location.pathname.startsWith("/transactions")) {
    return <TransactionListAside />;
  }

  return (
    <div className="text-center">
      <span>No related sidebar for the current context</span>
    </div>
  );
};

class Aside extends Component {
  render() {
    const { location } = this.props.aside;
    return (
      <aside className="aside-menu">
        <div className="tab-content">
          <AsideContent location={location} />
        </div>
      </aside>
    );
  }
}

const mapStateToProps = ({ aside }) => {
  return { aside };
};

export default connect(mapStateToProps, null)(Aside);
