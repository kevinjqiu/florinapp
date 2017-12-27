import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
} from "reactstrap";
import React, { Component } from "react";
import * as actions from "../../actions";
import { connect } from "react-redux";
import AccountForm from "./AccountForm";
import { reduxForm } from "redux-form";
import Account from "../../models/Account";

const NewAccountForm = reduxForm({form: 'newAccount'})(AccountForm);

export class AccountNew extends Component {
  render() {
    const {createAccount} = this.props;
    return (
      <Row>
        <Col xs="12" lg="12">
          <Card>
            <CardHeader>
              <strong>New Account</strong>
            </CardHeader>
            <CardBody>
              <NewAccountForm onSubmit={props => createAccount(new Account(props))} />
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default connect(null, actions)(AccountNew);