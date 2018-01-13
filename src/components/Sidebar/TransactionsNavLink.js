import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Badge } from "reactstrap";
import { SidebarNavLink } from "./SidebarNav";
import ReactTooltip from "react-tooltip";
import { connect } from "react-redux";
import * as actions from "../../actions";

class TransactionsNavLink extends Component {
  componentDidMount() {
    const { dateRange, fetchUncategorizedTransactionsCount } = this.props;
    if (dateRange.start && dateRange.end) {
      fetchUncategorizedTransactionsCount({
        dateFrom: dateRange.start.format("YYYY-MM-DD"),
        dateTo: dateRange.end.format("YYYY-MM-DD")
      });
    }
  }

  componentDidUpdate(nextProps, nextState) {
    const dateRangeChanged =
      JSON.stringify(nextProps.dateRange) !==
      JSON.stringify(this.props.dateRange);
    if (!dateRangeChanged) {
      return;
    }

    this.props.fetchUncategorizedTransactionsCount({
      dateFrom: this.props.dateRange.start.format("YYYY-MM-DD"),
      dateTo: this.props.dateRange.end.format("YYYY-MM-DD")
    });
  }

  render() {
    const { uncategorizedTransactionsCount, dateRange } = this.props;
    const link = `/transactions?filters.dateFrom=${dateRange.start.format(
      "YYYY-MM-DD"
    )}&filters.dateTo=${dateRange.end.format(
      "YYYY-MM-DD"
    )}&filters.showOnlyUncategorized=true`;
    return (
      <SidebarNavLink
        name="Transactions"
        url="/transactions"
        icon="icon-book-open"
      >
        {uncategorizedTransactionsCount > 0 ? (
          <Link to={link}>
            <Badge
              color="success"
              pill
              data-tip
              data-for="tooltip-transactions-sidebar-badge"
            >
              {uncategorizedTransactionsCount}
            </Badge>
          </Link>
        ) : (
          <span />
        )}
        {uncategorizedTransactionsCount > 0 ? (
          <ReactTooltip id="tooltip-transactions-sidebar-badge">
            Number of uncategorized transactions in the current date range
          </ReactTooltip>
        ) : (
          <span />
        )}
      </SidebarNavLink>
    );
  }
}

const mapStateToProps = ({ globals }) => {
  const { dateRange, uncategorizedTransactionsCount } = globals;
  return { dateRange, uncategorizedTransactionsCount };
};

export default connect(mapStateToProps, actions)(TransactionsNavLink);
