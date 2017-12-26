import React, { Component } from "react";
import { Row, Col, CardHeader, CardBody } from "reactstrap";
import Dropzone from  "react-dropzone";
import { connect } from "react-redux";
import * as actions from "../../actions";

class AccountStatementImports extends React.Component {
  render() {
    const { importAccountStatement } = this.props;
    return <div>
        <Col xs="3" lg="3">
          <Dropzone className="form-control" onDrop={(accepted, rejected) => {
            const statementFile = accepted[0];
            importAccountStatement(statementFile);
            }}>
            <i className="fa fa-cloud-upload" style={{ fontSize: "8em" }} aria-hidden="true" />
            <div>Drop your account statements here (OFX/QFX)</div>
          </Dropzone>
        </Col>
        <Col xs="9" lg="9" />
      </div>;
  }
}

export default connect(null, actions)(AccountStatementImports);