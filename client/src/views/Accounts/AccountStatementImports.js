import React, { Component } from "react";
import { Col } from "reactstrap";
import Dropzone from "react-dropzone";
import { connect } from "react-redux";
import * as actions from "../../actions";
import Account from "../../models/Account";

class AccountStatementImports extends Component {
  render() {
    const { ui, currentAccount, importAccountStatement } = this.props;
    return (
      <div>
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
              <i className="fa fa-spinner fa-spin fa-3x fa-fw" style={{ fontSize: "8em" }}/>
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
        <Col xs="9" lg="9" />
      </div>
    );
  }
}

const mapStateToProps = ({ currentAccount, ui }) => {
  return { currentAccount, ui };
};

export default connect(mapStateToProps, actions)(AccountStatementImports);
