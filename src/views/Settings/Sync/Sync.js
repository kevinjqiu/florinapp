import React, { Component } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Row,
  Col,
  Alert,
  Table
} from "reactstrap";
import { Field, reduxForm } from "redux-form";
import InputField from "../../../components/InputField/InputField";
import db from "../../../db";

const sync = () => {
  db
    .sync("http://admin:password@localhost:5984/florin", {
      live: true,
      retry: true
    })
    .on("change", info => {
      console.log(info);
    })
    .on("paused", (err) => {
      console.log(err);
    })
    .on("active", () => {

    })
    .on("denied", (err) => {
      console.log(err);
    })
    .on("complete", (info) => {
      console.log(info);
    })
    .on("error", (err) => {
      console.log(err);
    });
};

let SyncSetupForm = () => {
  return (
    <form className="form-horizontal">
      <Field
        name="remote"
        label="Target address"
        component={InputField}
        input={{ placeholder: "e.g., http://localhost:5984/florin" }}
      />
      <Button color="success" onClick={sync}>
        Start Sync!
      </Button>
    </form>
  );
};

SyncSetupForm = reduxForm({ form: "syncSetup" })(SyncSetupForm);

export default class Sync extends Component {
  render() {
    return (
      <Row>
        <Col xs="12" lg="12">
          <Card>
            <CardHeader>
              <strong>Sync setup</strong>
            </CardHeader>
            <CardBody>
              <Table responsive>
                <thead>
                  <tr>
                    <th></th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>http://localhost:5984/florin</td>
                    <td></td>
                  </tr>
                </tbody>
              </Table>
              <SyncSetupForm />
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}
