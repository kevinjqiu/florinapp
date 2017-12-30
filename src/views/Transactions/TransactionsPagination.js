import React, { Component } from "react";
import { Pagination, PaginationLink, PaginationItem } from "reactstrap";
import { connect } from "react-redux";
import * as queryString from "query-string";

const FirstPage = ({ disabled, pathname, params }) => {
  params.page = 1;
  const href = `${pathname}?${queryString.stringify(params)}`;
  return (
    <PaginationItem disabled={disabled}>
      <PaginationLink previous href={href} />
    </PaginationItem>
  );
};

const LastPage = ({ disabled, page, pathname, params }) => {
  params.page = page;
  const href = `${pathname}?${queryString.stringify(params)}`;
  return (
    <PaginationItem disabled={disabled}>
      <PaginationLink next href={href} />
    </PaginationItem>
  );
};

const PageLink = ({ page, active, pathname, params }) => {
  params.page = page;
  const href = `${pathname}?${queryString.stringify(params)}`;
  return (
    <PaginationItem active={active}>
      <PaginationLink href={href}>{page}</PaginationLink>
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
        <FirstPage
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
        <LastPage
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
  const total = transactions.transactions.length;
  const { pagination } = transactions.fetchOptions;
  const { location } = router;
  return {
    pagination,
    location,
    total
  };
};

export default connect(mapStateToProps, null)(TransactionsPagination);
