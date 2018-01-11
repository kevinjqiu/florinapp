import React, { Component } from "react";
import { connect } from "react-redux";
import TransactionListAside from "./TransactionListAside";

const AsideContent = ({ type }) => {
  if (type === "TransactionListAside") {
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
    const { asideType } = this.props;
    return (
      <aside className="aside-menu">
        <div className="tab-content">
          <AsideContent type={asideType} />
        </div>
      </aside>
    );
  }
}

const mapStateToProps = ({ aside }) => {
  const { asideType } = aside;
  return { asideType };
};

export default connect(mapStateToProps, null)(Aside);
