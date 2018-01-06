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
import { DropdownList } from 'react-widgets'

const LinkedTransactionComponent = ({ item }) => {
  if (item) {
    return <span><Date date={item.date} /><Currency amount={item.amount} code="USD"/></span>
  } else {
    return <span />;
  }
};

class LinkTransactions extends Component {

  componentDidUpdate(prevProps, prevState) {
    const prevTransactionId = prevProps.transaction && prevProps.transaction._id || null;
    const { transaction, fetchTransactionLinkCandidates } = this.props;
    const curTransactionId = transaction && transaction._id || null;
    if (prevTransactionId !== curTransactionId) {
      fetchTransactionLinkCandidates(transaction);
    }
  }

  render() {
    const { candidates, isOpen, closeLinkTransactionsDialog } = this.props;
    return (
      <Modal isOpen={isOpen}>
        <ModalHeader>Link Transactions</ModalHeader>
        <ModalBody>
          <Container fluid>
            <Row>
              <Col xs="12" lg="12">
                <Alert color="primary"><p>This dialog box allows you to link two account transfer transactions together.</p><p>After the link is established, both transactions will be assigned the category: <strong>Account Transfer</strong></p></Alert>
                <Form>
                  <FormGroup row>
                    <Label for="linkedTransaction" sm="3">
                      Linked Transaction
                    </Label>
                    <Col sm="9">
                      <DropdownList data={candidates} valueComponent={LinkedTransactionComponent} itemComponent={LinkedTransactionComponent} />
                    </Col>
                  </FormGroup>
                </Form>
              </Col>
            </Row>
          </Container>
        </ModalBody>
        <ModalFooter>
          <Button color="primary">Link</Button>{" "}
          <Button
            color="danger"
            onClick={() => {
              closeLinkTransactionsDialog();
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
