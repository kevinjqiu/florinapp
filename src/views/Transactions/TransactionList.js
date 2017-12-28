import React, { Component } from "react";
import { Row, Col, Card, CardHeader, CardBody, ButtonGroup } from "reactstrap";
import { connect } from "react-redux";
import * as actions from "../../actions";
import TransactionTable from "./TransactionTable";
import RefreshButton from "../../components/RefreshButton/RefreshButton";

class TransactionList extends Component {
  componentDidMount() {
    this.props.fetchTransactions();
  }

  render() {
    const { transactions, ui, fetchTransactions } = this.props;
    return <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <strong>Transactions</strong>
                {ui.loading ? <i className="fa fa-refresh fa-spin fa-1x fa-fw" /> : <span />}
                <ButtonGroup className="float-right">
                  <RefreshButton onClick={fetchTransactions} />
                </ButtonGroup>
              </CardHeader>
              <CardBody>
                <TransactionTable transactions={transactions} ui={ui} />
              </CardBody>
            </Card>
          </Col>
    </Row>;
  }
}

const mapStateToProps = (state) => {
  const { transactions, loading, failed } = state.transactions;
  return {
    transactions,
    ui: {
      loading,
      failed
    }
  }
}

export default connect(mapStateToProps, actions)(TransactionList);