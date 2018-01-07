import React, { Component } from "react";
import {
  Alert,
  Label,
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
} from "reactstrap";
import * as actions from "../../actions";
import Date from "../../components/Date/Date";
import Currency from "../../components/Currency/Currency";
import { connect } from "react-redux";
import { DropdownList } from "react-widgets";

const LinkedTransactionComponent = ({ item }) => {
  if (item) {
    return (
      <span>
        {item.name}:
        <Currency amount={item.amount} code={item.account.currency} /> in{" "}
        {item.account.name} on <Date date={item.date} />
      </span>
    );
  } else {
    return <span />;
  }
};

class LinkTransactions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null,
      error: null
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const prevTransactionId =
      (prevProps.transaction && prevProps.transaction._id) || null;
    const { transaction, fetchTransactionLinkCandidates } = this.props;
    const curTransactionId = (transaction && transaction._id) || null;
    if (transaction !== null && prevTransactionId !== curTransactionId) {
      fetchTransactionLinkCandidates(transaction);
    }
  }

  render() {
    const {
      transaction,
      candidates,
      isOpen,
      closeLinkTransactionsDialog,
      linkTransactions
    } = this.props;
    return (
      <Modal isOpen={isOpen}>
        <ModalHeader>Link Transactions</ModalHeader>
        <ModalBody>
          <Container fluid>
            <Row>
              <Col xs="12" lg="12">
                <Alert color="primary">
                  <p>
                    This dialog box allows you to link two account transfer
                    transactions together.
                  </p>
                  <p>
                    After the link is established, both transactions will be
                    assigned the category: <strong>Account Transfer</strong>
                  </p>
                </Alert>
                <Form>
                  <FormGroup row>
                    <Label for="linkedTransaction" sm="3">
                      Linked Transaction
                    </Label>
                    <Col sm="9">
                      <DropdownList
                        onChange={value => {
                          this.setState({ selected: value });
                        }}
                        value={this.state.selected}
                        data={candidates}
                        valueComponent={LinkedTransactionComponent}
                        itemComponent={LinkedTransactionComponent}
                      />
                    </Col>
                  </FormGroup>
                </Form>
                {this.state.error ? (
                  <Alert color="danger">{this.state.error}</Alert>
                ) : (
                  <span />
                )}
              </Col>
            </Row>
          </Container>
        </ModalBody>
        <ModalFooter>
          <Button
            color="success"
            onClick={() => {
              const { selected } = this.state;
              if (this.state.selected === null) {
                this.setState({
                  error: "Must choose a transaction to link"
                });
                return;
              }
              linkTransactions(transaction, selected);
              closeLinkTransactionsDialog();
              this.setState({
                error: null
              });
            }}
          >
            Link
          </Button>{" "}
          <Button
            color="danger"
            onClick={() => {
              closeLinkTransactionsDialog();
              this.setState({
                error: null
              });
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = ({ ui }) => {
  const { linkTransactions } = ui;
  return linkTransactions;
};

export default connect(mapStateToProps, actions)(LinkTransactions);
