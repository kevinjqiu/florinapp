import React, { Component } from "react";
import { Card, Row, Col, CardHeader, CardBody } from "reactstrap";
import { connect } from "react-redux";
import AccountForm from "./AccountForm";
import * as actions from "../../actions";
import { reduxForm } from "redux-form";
import Account from "../../models/Account";
import AccountStatementImports from "./AccountStatementImports";
import * as PropTypes from "prop-types";

const ViewAccountForm = connect(({ currentAccount }) => {
  return {
    initialValues: currentAccount
  };
}, null)(reduxForm({ form: "viewAccount" })(AccountForm));

class AccountDetails extends Component {
  static propTypes = {
    match: PropTypes.object,
    updateAccount: PropTypes.func
  }

  componentWillMount() {
    const { accountId } = this.props.match.params;
    this.props.fetchAccountById(accountId);
  }

  render() {
    const { accountId } = this.props.match.params;
    const { updateAccount } = this.props;
    return (
      <div>
      <Row>
        <Col xs="12" lg="12">
          <Card>
            <CardHeader>
              <strong>Account Details</strong>
            </CardHeader>
            <CardBody>
              <ViewAccountForm
                editMode
                onSubmit={props => updateAccount(accountId, new Account(props))}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col xs="12" lg="12">
          <Card>
            <CardHeader>
              <strong>Statement Imports</strong>
            </CardHeader>
            <CardBody>
              <AccountStatementImports />
            </CardBody>
          </Card>
        </Col>
      </Row>
      </div>
    );
  }
}

export default connect(null, actions)(AccountDetails);
