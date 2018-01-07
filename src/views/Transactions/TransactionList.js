import React, { Component } from "react";
import { Container, Badge, Row, Col, ButtonGroup } from "reactstrap";
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
      <Container fluid>
        <Row>
          <Col xs="12" lg="12">
            <h3 className="float-left">Transactions</h3>
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
            <ButtonGroup>
              <RefreshButton
                onClick={() => {
                  fetchTransactions(this.props.transactionsState.fetchOptions);
                }}
              />
            </ButtonGroup>
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
