import React, { Component } from "react";
import {
  Alert,
  Row,
  Col,
  Container,
  Table,
  ButtonGroup,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../../actions";
import Currency from "../../components/Currency/Currency";
import RefreshButton from "../../components/RefreshButton/RefreshButton";
import ViewButton from "../../components/ListActionButton/ViewButton";
import DeleteButton from "../../components/ListActionButton/DeleteButton";
import NewButton from "../../components/NewButton/NewButton";

const NewAccountButton = ({ alignRight }) => {
  return <NewButton linkUrl="/accounts/new" caption="New Account" className={alignRight ? "float-right" : ""} />
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

const GroupByOption = ({uiOptions, changeAccountListGroupByOption}) => {
  return (
    <Table style={{border: "none"}}>
      <thead>
        <tr>
          <th style={{ textAlign: "center", border: "none" }}>
            <FormGroup row style={{ marginBottom: "0em" }}>
              <Col md="3" />
              <Col md="6">
                <FormGroup style={{ margin: "0px; auto" }}>
                  <Label check>Group By</Label>{" "}
                  <Label check htmlFor="group-by">
                    <Input
                      type="radio"
                      id="account-group-by"
                      name="account-group-by"
                      value="group-by-none"
                      defaultChecked={uiOptions.groupBy === null}
                      onChange={() => {
                        changeAccountListGroupByOption(null);
                      }}
                    />
                    <span style={{ fontWeight: "normal" }}>None</span>
                  </Label>{" "}
                  <Label check htmlFor="group-by">
                    <Input
                      type="radio"
                      id="account-group-by"
                      name="account-group-by"
                      value="group-by-fi"
                      defaultChecked={
                        uiOptions.groupBy === "financialInstitution"
                      }
                      onChange={() => {
                        changeAccountListGroupByOption("financialInstitution");
                      }}
                    />
                    <span style={{ fontWeight: "normal" }}>
                      Financial Institution
                    </span>
                  </Label>{" "}
                  <Label check htmlFor="group-by">
                    <Input
                      type="radio"
                      id="account-group-by"
                      name="account-group-by"
                      value="group-by-type"
                      defaultChecked={uiOptions.groupBy === "accountType"}
                      onChange={() => {
                        changeAccountListGroupByOption("accountType");
                      }}
                    />
                    <span style={{ fontWeight: "normal" }}>Account Type</span>
                  </Label>{" "}
                  <Label check htmlFor="group-by">
                    <Input
                      type="radio"
                      id="account-group-by"
                      name="account-group-by"
                      value="group-by-currency"
                      defaultChecked={uiOptions.groupBy === "currency"}
                      onChange={() => {
                        changeAccountListGroupByOption("currency");
                      }}
                    />
                    <span style={{ fontWeight: "normal" }}>Currency</span>
                  </Label>
                </FormGroup>
              </Col>
              <Col md="3" />
            </FormGroup>
          </th>
        </tr>
      </thead>
    </Table>
  );
};

const AccountsTable = ({accounts, deleteAccountWithConfirmation, showGlobalModal, hideGlobalModal, deleteAccount, fetchAccounts}) => {
  const accountsTally = accounts.reduce((aggregateByCurrency, currentAccount) => {
    // TODO: I'm not able to get decimal.js to work with ES6...
    // It compalins:
    // TypeError: __WEBPACK_IMPORTED_MODULE_9_decimal_js__ is not a constructor
    // Temporarily use the imprecise float point arithmatic for summing monies
    aggregateByCurrency[currentAccount.currency] = aggregateByCurrency[currentAccount.currency] || 0;
    const currentBalance = currentAccount.history ? currentAccount.history[currentAccount.history.length - 1].balance : "0";
    aggregateByCurrency[currentAccount.currency] = aggregateByCurrency[currentAccount.currency] + parseFloat(currentBalance);
    return aggregateByCurrency;
  }, {})
  return <Table>
      <thead>
        <tr>
          <th />
          <th>Name</th>
          <th>Financial Institution</th>
          <th>Currency</th>
          <th>Type</th>
          <th style={{ textAlign: "right" }}>Current Balance</th>
        </tr>
      </thead>
      <tbody>
        {accounts.map(account => <tr key={account._id}>
            <td>
              <ButtonGroup className="float-right">
                <Link to={`/accounts/${account._id}/view`}>
                  <ViewButton objectId={account._id} />
                </Link>
                <DeleteButton objectId={account._id} onClick={() => deleteAccountWithConfirmation(
                      {
                        accountId: account._id,
                        showGlobalModal,
                        hideGlobalModal,
                        deleteAccount,
                        fetchAccounts
                      }
                    )} />
              </ButtonGroup>
            </td>
            <td>
              <Link to={`/accounts/${account._id}/view`}>{account.name}</Link>
            </td>
            <td>{account.financialInstitution}</td>
            <td>{account.currency}</td>
            <td>{account.type}</td>
            <td style={{ textAlign: "right" }}>
              {getLatestAccountBalance(account)}
            </td>
          </tr>)}
      </tbody>
      <tfoot>
        <tr>
          <th colSpan="6">
            {Object.keys(accountsTally).map((currency, idx) => {
              return <div key={`${currency}-${idx}`}>{currency}: <Currency amount={accountsTally[currency]} code={currency} /></div>
            })}
          </th>
        </tr>
      </tfoot>
    </Table>;
};

const groupAccountsByKey = (accounts: Array<Account>, key: string) => {
  const groupedAccounts = accounts.reduce((aggregate, account) => {
    aggregate[account[key]] = aggregate[account[key]] || [];
    aggregate[account[key]].push(account);
    return aggregate;
  }, {});
  return groupedAccounts;
};

const AccountCardBody = ({
  accounts,
  loading,
  failed,
  uiOptions,
  deleteAccount,
  showGlobalModal,
  hideGlobalModal,
  fetchAccounts,
  changeAccountListGroupByOption
}) => {
  if (loading) {
    return (
      <i
        className="fa fa-spinner fa-spin fa-3x fa-fw"
        style={{ fontSize: "8em" }}
      />
    );
  }
  if (failed) {
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

  const accountsTable = (accounts, key) => {
    accounts.sort((a, b) => a.name.localeCompare(b.name));
    return <AccountsTable key={key} accounts={accounts} deleteAccountWithConfirmation={deleteAccountWithConfirmation} showGlobalModal={showGlobalModal} hideGlobalModal={hideGlobalModal} deleteAccount={deleteAccount} fetchAccounts={fetchAccounts} />;
  };

  const renderGroupedAccounts = groupedAccounts => {
    return Object.keys(groupedAccounts).map((key, idx) => {
      const accounts = groupedAccounts[key];
      return <div key={idx}>
          <h4>{key}</h4>
          {accountsTable(accounts)}
        </div>;
    });
  };

  let accountsTables = [];
  let groupedAccounts = {};
  switch (uiOptions.groupBy) {
    case null:
      accountsTables = [accountsTable(accounts, 1)];
      break;
    case "financialInstitution":
      groupedAccounts = groupAccountsByKey(accounts, "financialInstitution");
      accountsTables = renderGroupedAccounts(groupedAccounts);
      break;
    case "accountType":
      groupedAccounts = groupAccountsByKey(accounts, "type");
      accountsTables = renderGroupedAccounts(groupedAccounts);
      break;
    case "currency":
      groupedAccounts = groupAccountsByKey(accounts, "currency");
      accountsTables = renderGroupedAccounts(groupedAccounts);
      break;
    default:
      break;
  }

  return (
    <div>
      <GroupByOption uiOptions={uiOptions} changeAccountListGroupByOption={changeAccountListGroupByOption} />
      {accountsTables}
    </div>
  );
};

class AccountList extends Component {
  componentWillMount() {
    this.props.fetchAccounts();
  }
  render() {
    const { accounts, loading, failed, uiOptions } = this.props.accountsState;
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
            <AccountCardBody
              accounts={accounts}
              loading={loading}
              failed={failed}
              uiOptions={uiOptions}
              {...this.props}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = ({ accounts }) => {
  return { accountsState: accounts };
};

export default connect(mapStateToProps, actions)(AccountList);
