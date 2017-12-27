import React, { Component } from "react";
import { Row, Col, Card, CardHeader, CardBody } from "reactstrap";
import { connect } from "react-redux";
import * as actions from "../../actions";

class TransactionList extends Component {
  componentDidMount() {
  }

  render() {
    return <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <strong>Transactions</strong>
              </CardHeader>
              <CardBody>
              </CardBody>
            </Card>
          </Col>
    </Row>;
  }
}

export default connect(null, actions)(TransactionList);