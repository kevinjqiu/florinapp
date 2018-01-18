import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import Transaction from "../../models/Transaction";
import * as actions from "../../actions";
import TransactionForm from "./TransactionForm";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";

class TransactionDetails extends Component {
  componentDidMount() {
    const { transactionId } = this.props.match.params;
    this.props.fetchTransactionById(transactionId);
  }

  render() {
    const { currentTransaction } = this.props;

    console.log(currentTransaction);

    if (!currentTransaction) {
      return <h3>No such transaction</h3>;
    }
    const EditTransactionForm = reduxForm({
      initialValues: currentTransaction,
      form: "editTransaction"
    })(TransactionForm);
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
              editMode
              onSubmit={props => {
                console.log(props);
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
