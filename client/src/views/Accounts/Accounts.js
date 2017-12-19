import { Row, Col, Card, CardHeader, CardBody, Table, Button, ButtonGroup } from "reactstrap";
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

const AccountCardBody = ({ accounts }) => {
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
          </tr>
        </thead>
        <tbody>
          {accounts.map(account => <tr key={account.id}>
              <td>{account.name}</td>
              <td>{account.financialInstitution}</td>
              <td>{account.type}</td>
            </tr>)}
        </tbody>
      </Table>
    </CardBody>;
};

class Accounts extends Component {
  render() {
    const { accounts } = this.props;
    return <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <strong>Current Accounts</strong>
                <ButtonGroup className="float-right">
                  <NewAccountButton alignRight />
                  <Button
                    color="primary"
                    size="sm"
                    outline
                    onClick={this.props.fetchAccounts}
                  >
                    <i className="fa fa-refresh" aria-hidden="true" />
                    {"\u00A0"}Refresh
                  </Button>
                </ButtonGroup>
              </CardHeader>
              <AccountCardBody accounts={accounts} />
            </Card>
          </Col>
        </Row>
      </div>;
  }
}

const mapStateToProps = ({accounts}) => {
  return { accounts };
}

export default connect(mapStateToProps, actions)(Accounts);
