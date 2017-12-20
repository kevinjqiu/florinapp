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

const AccountCardBody = ({ accounts, ui }) => {
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
            <th></th>
          </tr>
        </thead>
        <tbody>
          {accounts.map(account => <tr key={account.id}>
              <td><Link to={`/accounts/${account.id}`}>{account.name}</Link></td>
              <td>{account.financialInstitution}</td>
              <td>{account.type}</td>
              <td>$0.00</td>
              <td>
                <ButtonGroup className="float-right">
                  <Button color="danger" size="sm" outline onClick={() => console.log("called")}>
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
    return <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <strong>Current Accounts</strong>
                {ui.loading ? <i className="fa fa-refresh fa-spin fa-1x fa-fw" /> : <span />}
                <ButtonGroup className="float-right">
                  <NewAccountButton alignRight />
                  <Button color="primary" size="sm" outline onClick={this.props.fetchAccounts}>
                    <i className="fa fa-refresh" aria-hidden="true" />
                    {"\u00A0"}Refresh
                  </Button>
                </ButtonGroup>
              </CardHeader>
              <AccountCardBody accounts={accounts} ui={ui} />
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
