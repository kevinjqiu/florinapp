import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as links from "../../models/links";
import moment from "moment";
import { defaultFetchOptions } from "../../services/transactionService";  // TODO: fix dependency

const PreviousMonth = ({ location }) => {
  const newLink = links.createTransactionLink(location, (queryParams) => {
    const dateFrom = queryParams["filters.dateFrom"] ? queryParams["filters.dateFrom"] : defaultFetchOptions.filters.dateFrom;
    const dateTo = queryParams["filters.dateTo"] ? queryParams["filters.dateTo"] : defaultFetchOptions.filters.dateTo;
    const newDateFrom = moment(dateFrom).subtract(1, "months").startOf("month");
    const newDateTo = newDateFrom.clone().endOf("month");
    return {
      ...queryParams,
      "filters.dateFrom": newDateFrom.format("YYYY-MM-DD"),
      "filters.dateTo": newDateTo.format("YYYY-MM-DD"),
      page: 1
    }
  });

  return (
    <Link to={newLink}>
      <i className="fa fa-chevron-left" />
    </Link>
  );
};

const mapStateToProps = ({ router }) => {
  const { location } = router;
  return { location };
};
export default connect(mapStateToProps, null)(PreviousMonth);
