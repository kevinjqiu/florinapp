import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as links from "../../models/links";
import * as actions from "../../actions";
import moment from "moment";
import { defaultFetchOptions } from "../../services/transactionService";  // TODO: fix dependency
import DateRange from "../../models/DateRange";

const getDateRangeFromQueryParams = (queryParams, monthOffset) => {
  const dateFrom = queryParams["filters.dateFrom"] ? queryParams["filters.dateFrom"] : defaultFetchOptions.filters.dateFrom;
  const newDateFrom = moment(dateFrom).add(monthOffset, "months").startOf("month");
  const newDateTo = newDateFrom.clone().endOf("month");
  return {
    dateFrom: newDateFrom,
    dateTo: newDateTo
  }
};

const MonthNavigator = ({ location, iconClass, monthOffset, changeDateRange, dateRange }) => {
  const isOnTransactionsPage = location.pathname.startsWith("/transactions");
  if (isOnTransactionsPage) {
    const newLink = links.createTransactionLink(location, (queryParams) => {
      const { dateFrom, dateTo } = getDateRangeFromQueryParams(queryParams, monthOffset);
      return {
        ...queryParams,
        "filters.dateFrom": dateFrom.format("YYYY-MM-DD"),
        "filters.dateTo": dateTo.format("YYYY-MM-DD"),
        page: 1
      }
    });

    return (
      <Link to={newLink}>
        <i className={`fa ${iconClass}`} />
      </Link>
    );
  }

  if (!dateRange) {
    return <span />
  }

  const dateRangeStart = dateRange.start.clone();
  const newDateFrom = dateRangeStart.add(monthOffset, "months").startOf("month");
  const newDateTo = newDateFrom.clone().endOf("month");
  const newDateRange = new DateRange({
    start: newDateFrom,
    end: newDateTo
  });
  return <Link to="#" onClick={() => changeDateRange(newDateRange)}><i className={`fa ${iconClass}`}/></Link>
};

const mapStateToProps = ({ router, globals }) => {
  const { location } = router;
  const { dateRange } = globals;
  return { location, dateRange };
};

export default connect(mapStateToProps, actions)(MonthNavigator);
