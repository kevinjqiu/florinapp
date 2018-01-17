import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import _TransactionForm from "./TransactionForm";
import { reduxForm } from "redux-form";

const newTransactionForm = () => {
  return reduxForm({
    form: "newTransaction"
  })(_TransactionForm);
};

class TransactionNew extends Component {
  render() {
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
            <TransactionForm editMode={false} onSubmit={(props) => console.log(props)} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default TransactionNew;