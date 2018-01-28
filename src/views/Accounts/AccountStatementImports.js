import React, { Component } from "react";
import { Row, Col, Table } from "reactstrap";
import Dropzone from "react-dropzone";
import { connect } from "react-redux";
import * as actions from "../../actions";
import Currency from "../../components/Currency/Currency";
import Date from "../../components/Date/Date";

const AccountHistory = ({ currentAccount }) => {
  if (currentAccount && currentAccount.history) {
    return (
      <Table responsive>
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {currentAccount.history.map((h, idx) => {
            return <tr key={idx}>
              <td><Date date={h.dateTime} /></td>
              <td><Currency amount={h.balance} code={currentAccount.currency} /></td>
              </tr>
          })}
        </tbody>
      </Table>
    );
  }
  return <div>No statement import history. Upload some statements first. </div>;
};

class AccountStatementImports extends Component {
  render() {
    const { ui, currentAccount, importAccountStatement } = this.props;
    return (
      <Row>
        <Col xs="3" lg="3">
          <Dropzone
            className="form-control"
            onDrop={(accepted, rejected) => {
              accepted.forEach(statementFile => {
                importAccountStatement(currentAccount, statementFile);
              });
            }}
          >
            {ui.statementImport.loading ? (
              <i
                className="fa fa-spinner fa-spin fa-3x fa-fw"
                style={{ fontSize: "8em" }}
              />
            ) : (
              <i
                className="fa fa-cloud-upload"
                style={{ fontSize: "8em" }}
                aria-hidden="true"
              />
            )}
            <div>Drop your account statements here (OFX/QFX)</div>
          </Dropzone>
        </Col>
        <Col xs="9" lg="9">
          <AccountHistory currentAccount={currentAccount} />
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ currentAccount, ui }) => {
  return { currentAccount, ui };
};

export default connect(mapStateToProps, actions)(AccountStatementImports);
