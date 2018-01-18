import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import _TransactionForm from "./TransactionForm";
import { reduxForm } from "redux-form";
import * as moment from "moment";
import Transaction from "../../models/Transaction";
import { connect } from "react-redux";
import * as actions from "../../actions"

const newTransactionForm = () => {
  return reduxForm({
    form: "newTransaction",
    initialValues: {
      date: moment().startOf("day").toDate()
    }
  })(_TransactionForm);
};

class TransactionNew extends Component {
  render() {
    const { createTransaction } = this.props;
    const TransactionForm = newTransactionForm();
    return (
      <Container fluid>
        <Row>
          <Col xs="12" lg="12">
            <h3>New Transaction</h3>
          </Col>
        </Row>
        <Row>
          <Col xs="12" lg="12">
            <TransactionForm editMode={false} onSubmit={(props) => createTransaction(new Transaction(props))} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default connect(null, actions)(TransactionNew);