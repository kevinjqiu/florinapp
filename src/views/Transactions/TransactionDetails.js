import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import Transaction from "../../models/Transaction";
import * as actions from "../../actions";
import TransactionForm from "./TransactionForm";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";

const EditTransactionForm = reduxForm({
  form: "editTransaction"
})(TransactionForm);

class TransactionDetails extends Component {
  componentDidMount() {
    const { transactionId } = this.props.match.params;
    this.props.fetchTransactionById(transactionId);
  }

  render() {
    const { transactionId } = this.props.match.params;
    const { currentTransaction, updateTransaction } = this.props;

    if (!currentTransaction) {
      return <h3>No such transaction</h3>;
    }

    return (
      <Container fluid>
        <Row>
          <Col xs="12" lg="12">
            <h3>Transaction Details</h3>
          </Col>
        </Row>
        <Row>
          <Col xs="12" lg="12">
            <EditTransactionForm
              initialValues={currentTransaction}
              editMode
              onSubmit={props => {
                updateTransaction(transactionId, new Transaction(props));
              }}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = ({ transactions }) => {
  const { currentTransaction } = transactions;
  return { currentTransaction };
};

export default connect(mapStateToProps, actions)(TransactionDetails);
