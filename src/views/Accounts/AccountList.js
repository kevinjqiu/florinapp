import React, { Component } from "react";
import {
  Alert,
  Row,
  Col,
  Container,
  Table,
  Button,
  ButtonGroup
} from "reactstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../../actions";
import Currency from "../../components/Currency/Currency";
import RefreshButton from "../../components/RefreshButton/RefreshButton";
import ViewButton from "../../components/ListActionButton/ViewButton";
import DeleteButton from "../../components/ListActionButton/DeleteButton";

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
  if (ui.loading) {
    return (
      <i
        className="fa fa-spinner fa-spin fa-3x fa-fw"
        style={{ fontSize: "8em" }}
      />
    );
  }
  if (ui.failed) {
    return (
      <Alert color="danger">Loading accounts failed. Try again later...</Alert>
    );
  }
  if (accounts.length === 0) {
    return (
      <span>
        There are currently no existing accounts. <NewAccountButton />
      </span>
    );
  }

  return (
    <Table responsive striped>
      <thead>
        <tr>
          <th />
          <th>Name</th>
          <th>Financial Institution</th>
          <th>Currency</th>
          <th>Type</th>
          <th style={{textAlign: "right"}}>Current Balance</th>
        </tr>
      </thead>
      <tbody>
        {accounts.map(account => (
          <tr key={account._id}>
            <td>
              <ButtonGroup className="float-right">
                <Link to={`/accounts/${account._id}/view`}>
                  <ViewButton objectId={account._id} />
                </Link>
                <DeleteButton
                  objectId={account._id}
                  onClick={() =>
                    deleteAccountWithConfirmation({
                      accountId: account._id,
                      showGlobalModal,
                      hideGlobalModal,
                      deleteAccount,
                      fetchAccounts
                    })
                  }
                />
              </ButtonGroup>
            </td>
            <td>
              <Link to={`/accounts/${account._id}/view`}>{account.name}</Link>
            </td>
            <td>{account.financialInstitution}</td>
            <td>{account.currency}</td>
            <td>{account.type}</td>
            <td style={{textAlign: "right"}}>{getLatestAccountBalance(account)}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

class AccountList extends Component {
  componentWillMount() {
    this.props.fetchAccounts();
  }
  render() {
    const { accounts } = this.props;
    const { fetchAccounts } = this.props;
    return (
      <Container fluid>
        <Row>
          <Col xs="12" lg="12">
            <h2>Accounts</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <ButtonGroup>
              <NewAccountButton alignRight />
              <RefreshButton onClick={fetchAccounts} />
            </ButtonGroup>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col xs="12" lg="12">
            <AccountCardBody accounts={accounts} {...this.props} />
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = ({ accounts, ui }) => {
  return { accounts, ui: ui.accounts };
};

export default connect(mapStateToProps, actions)(AccountList);
