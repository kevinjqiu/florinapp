import { Row, Col, Card, CardHeader, CardBody, Table, Button } from "reactstrap";
import React, { Component } from "react";
import { connect } from "react-redux";

const NewAccountButton = ({alignRight}) => {
  return <Button color="primary" size="sm" outline className={alignRight ? "float-right" : ''}>
    <i className="fa fa-plus" aria-hidden="true" />
    {"\u00A0"}New
  </Button>;
}

const AccountCardBody = ({accounts}) => {
    if (accounts.length === 0) {
      return <CardBody>There are currently no existing accounts. <NewAccountButton /></CardBody>;
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
        </Table>
      </CardBody>;
}

class Accounts extends Component {
  render() {
    this.props =  {accounts: []};
    return <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <strong>Current Accounts</strong>
                <NewAccountButton alignRight />
              </CardHeader>
              <AccountCardBody accounts={this.props.accounts} />
            </Card>
          </Col>
        </Row>
      </div>;
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}
// export default connect(null, null)(Accounts);
export default connect(mapStateToProps, mapDispatchToProps)(Accounts);
