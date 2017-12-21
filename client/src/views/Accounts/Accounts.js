import { Alert, Row, Col, Card, CardHeader, CardBody, Table, Button, ButtonGroup } from "reactstrap";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import * as actions from '../../actions';

const NewAccountButton = ({ alignRight }) => {
  return (
    <Link to="/accounts/new">
      <Button
        color="primary"
        size="sm"
        outline
        className={alignRight ? "float-right" : ""}
      >
        <i className="fa fa-plus" aria-hidden="true" />
        {"\u00A0"}New
      </Button>
    </Link>
  );
};

const deleteAccountWithConfirmation = ({showGlobalModal, hideGlobalModal, deleteAccount, accountId, fetchAccounts}) => {
  showGlobalModal({
    title: "Are you sure?",
    body: "Do you want to delete this account?",
    positiveActionLabel: "Yes",
    positiveAction: () => {
      deleteAccount(accountId);
      hideGlobalModal();
      fetchAccounts();
    },
    negativeActionLabel: "No"
  })
};

const AccountCardBody = ({ accounts, ui, deleteAccount, showGlobalModal, hideGlobalModal, fetchAccounts }) => {
  if (ui.failed) {
    return <CardBody>
        <Alert color="danger">Loading accounts failed. Try again later...</Alert>
      </CardBody>;
  }
  if (accounts.length === 0) {
    return (
      <CardBody>
        There are currently no existing accounts. <NewAccountButton />
      </CardBody>
    );
  }

  return <CardBody>
      <Table responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Financial Institution</th>
            <th>Type</th>
            <th>Current Balance</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {accounts.map(account => <tr key={account.id}>
              <td>
                <Link to={`/accounts/${account.id}`}>{account.name}</Link>
              </td>
              <td>{account.financialInstitution}</td>
              <td>{account.type}</td>
              <td>$0.00</td>
              <td>
                <ButtonGroup className="float-right">
                  <Button color="danger" size="sm" outline onClick={() => deleteAccountWithConfirmation({accountId: account.id, showGlobalModal, hideGlobalModal, deleteAccount, fetchAccounts})}>
                    <i className="fa fa-trash" aria-hidden="true" />
                    {"\u00A0"}Delete
                  </Button>
                </ButtonGroup>
              </td>
            </tr>)}
        </tbody>
      </Table>
    </CardBody>;
};

class Accounts extends Component {
  componentWillMount() {
    this.props.fetchAccounts();
  }
  render() {
    const { accounts, ui } = this.props;
    const { fetchAccounts } = this.props;
    return <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <strong>Current Accounts</strong>
                {ui.loading ? <i className="fa fa-refresh fa-spin fa-1x fa-fw" /> : <span />}
                <ButtonGroup className="float-right">
                  <NewAccountButton alignRight />
                  <Button color="primary" size="sm" outline onClick={fetchAccounts}>
                    <i className="fa fa-refresh" aria-hidden="true" />
                    {"\u00A0"}Refresh
                  </Button>
                </ButtonGroup>
              </CardHeader>
              <AccountCardBody accounts={accounts} {...this.props} />
            </Card>
          </Col>
        </Row>
      </div>;
  }
}

const mapStateToProps = ({accounts, ui}) => {
  return { accounts, ui: ui.accounts };
}

export default connect(mapStateToProps, actions)(Accounts);
