import React, { Component } from "react";
import {
  Container,
  Button,
  Badge,
  Row,
  Col,
  ButtonGroup
} from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../actions";
import TransactionTable from "./TransactionTable";
import RefreshButton from "../../components/RefreshButton/RefreshButton";
import NewButton from "../../components/NewButton/NewButton";
import Switch from "../../components/Switch/Switch";
import * as links from "../../models/links";

const DateFilterBadge = ({ filters }) => {
  return (
    <Badge color="light" pill style={{fontSize: "1em", margin: "0.5em", padding: "0.6em"}}>
      {" "}Date: from {filters.dateFrom} to{" "} {filters.dateTo}{" "}
    </Badge>
  );
};

const CategoryFilterBadge = ({ filters, categories, location }) => {
  const { categoryId } = filters;
  if (!categoryId) {
    return <span />
  }

  const category = categories.find(c => c._id === categoryId)
  if (!category) {
    return <span />
  }

  const removeLink = links.createTransactionLink(location, (queryParams) => {
    const newQueryParams = {...queryParams};
    delete newQueryParams["filters.categoryId"]
    return newQueryParams;
  });

  return <Badge color="light" pill style={{fontSize: "1em", marginTop: "0.5em", padding: "0.6em"}}>
    <Link to={removeLink}><i className="fa fa-remove" /></Link>{" "}
    Category: {category.name}
  </Badge>
}

const AccountFilterBadge = ({ filters, accounts, location }) => {
  const { accountId } = filters;
  if (!accountId) {
    return <span />
  }

  const account = accounts.find(a => a._id === accountId);
  if (!account) {
    return <span />
  }

  const removeLink = links.createTransactionLink(location, (queryParams) => {
    const newQueryParams = {...queryParams};
    delete newQueryParams["filters.accountId"]
    return newQueryParams;
  });

  return <Badge color="light" pill style={{fontSize: "1em", marginTop: "0.5em", padding: "0.6em"}}>
    <Link to={removeLink}><i className="fa fa-remove" /></Link>{" "}
    Account: {account.name}
  </Badge>
}

class TransactionList extends Component {
  componentDidUpdate(nextProps, nextState) {
    const fetchOptionsChanged =
      JSON.stringify(nextProps.transactionsState.fetchOptions) !==
      JSON.stringify(this.props.transactionsState.fetchOptions);
    if (!fetchOptionsChanged) {
      return;
    }
    const { fetchOptions } = this.props.transactionsState;
    this.props.fetchTransactions(fetchOptions);
    this.props.fetchIncomeExpensesStats(fetchOptions.filters);
    this.props.fetchCategorySummaries(fetchOptions.filters);
  }

  componentDidMount() {
    this.props.fetchCategories();
    this.props.fetchAccounts();
    const { fetchOptions } = this.props.transactionsState;
    this.props.fetchTransactions(fetchOptions);
    this.props.fetchIncomeExpensesStats(fetchOptions.filters);
    this.props.fetchCategorySummaries(fetchOptions.filters);
  }

  render() {
    const {
      location,
      fetchTransactions,
      transactionsState,
      categoriesState,
      accountsState,
    } = this.props;
    const { fetchOptions } = transactionsState;
    return <Container fluid>
        <Row>
          <Col xs="12" lg="12">
            <h3 className="float-left">Transactions</h3>
          </Col>
          <Col xs="12" lg="12">
            <ButtonGroup style={{ marginLeft: 5 }}>
              <NewButton linkUrl="/transactions/new" caption="New Transaction" />
              <RefreshButton withCaption={true} onClick={() => {
                  fetchTransactions(this.props.transactionsState.fetchOptions);
                }} />
            </ButtonGroup>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col xs="12" lg="12">
            <Switch text="Include Account Transfers" tooltipId="switch-show-internaltransfer" tooltipText="Show/Hide account transfer transactions" onChange={() => {
                this.props.changeShowAccountTransfers(!transactionsState.fetchOptions.filters.showAccountTransfers, location);
              }} defaultChecked={fetchOptions.filters.showAccountTransfers} />
            <Switch text="Show only uncategorized" tooltipId="switch-show-uncategorized" tooltipText="Only show transactions that need categorization" onChange={() => {
                this.props.changeShowOnlyUncategorized(!transactionsState.fetchOptions.filters.showOnlyUncategorized, location);
              }} defaultChecked={fetchOptions.filters.showOnlyUncategorized} />
          </Col>
        </Row>
        <Row>
          <Col xs="12" lg="12">
            <DateFilterBadge filters={fetchOptions.filters} />
            <CategoryFilterBadge filters={fetchOptions.filters} categories={categoriesState.categories} location={location} />
            <AccountFilterBadge filters={fetchOptions.filters} accounts={accountsState.accounts} location={location} />
          </Col>
        </Row>
        <hr />
        <Row>
          <Col xs="12" lg="12">
            <TransactionTable transactionsState={transactionsState} categoriesState={categoriesState} />
          </Col>
        </Row>
      </Container>;
  }
}

const mapStateToProps = state => {
  const transactionsState = state.transactions;
  const categoriesState = state.categories;
  const accountsState = state.accounts;
  const location = state.router.location;
  return {
    categoriesState,
    transactionsState,
    accountsState,
    location
  };
};

export default connect(mapStateToProps, actions)(TransactionList);
