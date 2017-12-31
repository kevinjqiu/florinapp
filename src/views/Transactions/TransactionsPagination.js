import React, { Component } from "react";
import { Pagination, PaginationLink, PaginationItem } from "reactstrap";
import { connect } from "react-redux";
import * as queryString from "query-string";
import { Link } from "react-router-dom";

const FirstPageLink = ({ disabled, pathname, params }) => {
  params.page = 1;
  const href = `${pathname}?${queryString.stringify(params)}`;
  return (
    <PaginationItem disabled={disabled}>
      <Link to={href} className="page-link" aria-label="First">
        <span aria-hidden="true">«</span>
        <span className="sr-only">First</span>
      </Link>
    </PaginationItem>
  );
};

const LastPageLink = ({ disabled, page, pathname, params }) => {
  params.page = page;
  const href = `${pathname}?${queryString.stringify(params)}`;
  return (
    <PaginationItem disabled={disabled}>
      <Link to={href} className="page-link" aria-label="Last">
        <span aria-hidden="true">»</span>
        <span className="sr-only">Last</span>
      </Link>
    </PaginationItem>
  );
};

const PageLink = ({ page, active, pathname, params }) => {
  params.page = page;
  const href = `${pathname}?${queryString.stringify(params)}`;
  return (
    <PaginationItem active={active}>
      <Link to={href} className="page-link">{page}</Link>
    </PaginationItem>
  );
};

class TransactionsPagination extends Component {
  render() {
    const { pagination, location, total } = this.props;
    const lastPage = Math.ceil(total / pagination.perPage);
    const params = queryString.parse(location.search);
    return (
      <Pagination>
        <FirstPageLink
          disabled={pagination.page === 1}
          pathname={location.pathname}
          params={params}
        />
        {Array.from(Array(lastPage).keys()).map(i => {
          const active = i + 1 === pagination.page;
          return (
            <PageLink
              key={i + 1}
              page={i + 1}
              active={active}
              pathname={location.pathname}
              params={params}
            />
          );
        })}
        <LastPageLink
          page={lastPage}
          disabled={pagination.page === lastPage}
          pathname={location.pathname}
          params={params}
        />
      </Pagination>
    );
  }
}

const mapStateToProps = ({ transactions, router }) => {
  const total = transactions.total;
  const { pagination } = transactions.fetchOptions;
  const { location } = router;
  return {
    pagination,
    location,
    total
  };
};

export default connect(mapStateToProps, null)(TransactionsPagination);
