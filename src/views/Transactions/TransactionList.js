import React, { Component } from "react";
import { Badge, Row, Col, Card, CardHeader, CardBody, ButtonGroup } from "reactstrap";
import { connect } from "react-redux";
import * as actions from "../../actions";
import TransactionTable from "./TransactionTable";
import RefreshButton from "../../components/RefreshButton/RefreshButton";

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
  }

  componentDidMount() {
    this.props.fetchCategories();
    const { fetchOptions } = this.props.transactionsState;
    this.props.fetchTransactions(fetchOptions);
  }

  render() {
    const {
      fetchTransactions,
      transactionsState,
      categoriesState
    } = this.props;
    const { fetchOptions } = transactionsState;
    return (
      <Row>
        <Col xs="12" lg="12">
          <Card>
            <CardHeader>
              <strong>Transactions</strong>
              {transactionsState.loading ? (
                <i className="fa fa-refresh fa-spin fa-1x fa-fw" />
              ) : (
                <span />
              )}
              <ButtonGroup className="float-right">
                <RefreshButton onClick={() => {fetchTransactions(this.props.transactionsState.fetchOptions)}} />
              </ButtonGroup>
            </CardHeader>
            <CardBody>
              <Badge color="primary" pill> Date: from { fetchOptions.filters.dateFrom } to { fetchOptions.filters.dateTo } </Badge>
              <hr />
              <TransactionTable
                transactionsState={transactionsState}
                categoriesState={categoriesState}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
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
