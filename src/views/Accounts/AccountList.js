import React, { Component } from "react";
import {
  Alert,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Table,
  Button,
  ButtonGroup
} from "reactstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../../actions";
import Currency from "../../components/Currency/Currency";
import RefreshButton from "../../components/RefreshButton/RefreshButton";

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

const deleteAccountWithConfirmation = ({
  showGlobalModal,
  hideGlobalModal,
  deleteAccount,
  accountId,
  fetchAccounts
}) => {
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
  });
};

const getLatestAccountBalance = account => {
  const history = account.history || [];
  if (history.length === 0) {
    return "N/A";
  }
  const latest = history[history.length - 1];
  return <Currency amount={latest.balance} code={account.currency} />;
};

const AccountCardBody = ({
  accounts,
  ui,
  deleteAccount,
  showGlobalModal,
  hideGlobalModal,
  fetchAccounts
}) => {
  if (ui.failed) {
    return (
      <CardBody>
        <Alert color="danger">
          Loading accounts failed. Try again later...
        </Alert>
      </CardBody>
    );
  }
  if (accounts.length === 0) {
    return (
      <CardBody>
        There are currently no existing accounts. <NewAccountButton />
      </CardBody>
    );
  }

  return (
    <CardBody>
      <Table responsive striped>
        <thead>
          <tr>
            <th>Name</th>
            <th>Financial Institution</th>
            <th>Currency</th>
            <th>Type</th>
            <th>Current Balance</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {accounts.map(account => (
            <tr key={account._id}>
              <td>
                <Link to={`/accounts/${account._id}/view`}>{account.name}</Link>
              </td>
              <td>{account.financialInstitution}</td>
              <td>{account.currency}</td>
              <td>{account.type}</td>
              <td>{getLatestAccountBalance(account)}</td>
              <td>
                <ButtonGroup className="float-right">
                  <Link to={`/accounts/${account._id}/view`}>
                    <Button color="primary" size="sm">
                      <i className="fa fa-pencil-square-o" aria-hidden="true" />
                    </Button>
                  </Link>
                  <Button
                    color="danger"
                    size="sm"
                    onClick={() =>
                      deleteAccountWithConfirmation({
                        accountId: account._id,
                        showGlobalModal,
                        hideGlobalModal,
                        deleteAccount,
                        fetchAccounts
                      })
                    }
                  >
                    <i className="fa fa-trash" aria-hidden="true" />
                  </Button>
                </ButtonGroup>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </CardBody>
  );
};

class AccountList extends Component {
  componentWillMount() {
    this.props.fetchAccounts();
  }
  render() {
    const { accounts, ui } = this.props;
    const { fetchAccounts } = this.props;
    return (
      <Row>
        <Col xs="12" lg="12">
          <Card>
            <CardHeader>
              <strong>Current Accounts</strong>
              {ui.loading ? (
                <i className="fa fa-refresh fa-spin fa-1x fa-fw" />
              ) : (
                <span />
              )}
              <ButtonGroup className="float-right">
                <NewAccountButton alignRight />
                <RefreshButton onClick={fetchAccounts} />
              </ButtonGroup>
            </CardHeader>
            <AccountCardBody accounts={accounts} {...this.props} />
          </Card>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ accounts, ui }) => {
  return { accounts, ui: ui.accounts };
};

export default connect(mapStateToProps, actions)(AccountList);
