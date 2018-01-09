import React, { Component } from "react";
import { Label, Input, Container, Badge, Row, Col, ButtonGroup } from "reactstrap";
import { connect } from "react-redux";
import * as actions from "../../actions";
import TransactionTable from "./TransactionTable";
import RefreshButton from "../../components/RefreshButton/RefreshButton";
import TransactionsPagination from "./TransactionsPagination";

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
    const { fetchOptions } = this.props.transactionsState;
    this.props.fetchTransactions(fetchOptions);
    this.props.fetchIncomeExpensesStats(fetchOptions.filters);
    this.props.fetchCategorySummaries(fetchOptions.filters);
  }

  render() {
    const {
      fetchTransactions,
      transactionsState,
      categoriesState
    } = this.props;
    const { fetchOptions } = transactionsState;
    return (
      <Container fluid>
        <Row>
          <Col xs="12" lg="12">
            <h3 className="float-left">Transactions</h3>
            <ButtonGroup style={{marginLeft: 5}}>
              <RefreshButton
                withCaption={false}
                onClick={() => {
                  fetchTransactions(this.props.transactionsState.fetchOptions);
                }}
              />
            </ButtonGroup>
          </Col>
        </Row>
        <Row>
          <Col xs="12" lg="12">
            <Badge color="primary" pill>
              {" "}
              Date: from {fetchOptions.filters.dateFrom} to{" "}
              {fetchOptions.filters.dateTo}{" "}
            </Badge>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col xs="12" lg="12">
            <Label className="switch switch-3d switch-primary">
              <Input type="checkbox" className="switch-input" defaultChecked={ fetchOptions.filters.showAccountTransfers } />
              <span className="switch-label"></span>
              <span className="switch-handle"></span>
            </Label>
            {" "}Account Transfers
          </Col>
        </Row>
        <hr />
        <Row>
          <Col xs="12" lg="12">
            <TransactionTable
              transactionsState={transactionsState}
              categoriesState={categoriesState}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  const transactionsState = state.transactions;
  const categoriesState = state.categories;
  return {
    categoriesState,
    transactionsState
  };
};

export default connect(mapStateToProps, actions)(TransactionList);
