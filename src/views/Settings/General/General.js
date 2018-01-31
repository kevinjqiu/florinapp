import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button, FormFeedback, FormGroup, Label } from "reactstrap";
import { Field, reduxForm } from "redux-form";
import Settings from "../../../models/Settings";
import InputField from "../../../components/InputField/InputField";
import { DropdownList } from "react-widgets";

const LocaleField = ({ input, label, locales, meta: { touched, error } }) => {
  let options = touched ? { ...input, valid: !error } : { ...input };
  return (
    <div className="form-group">
      <FormGroup row>
        <Col md="3">
          <Label htmlFor="{input.name}">{label}</Label>
        </Col>
        <Col xs="12" md="9">
          <DropdownList
            data={locales}
            filter="contains"
            {...options}
          />
          <FormFeedback>{error}</FormFeedback>
        </Col>
      </FormGroup>
    </div>
  );
};

let GeneralSettingsForm = ({ handleSubmit, onSubmit, reset }) => {
  return (
    <form className="form-horizontal" onSubmit={handleSubmit(onSubmit)}>
      <Field name="locale" label="Locale" component={InputField} />
      <Button type="submit" color="primary">Save</Button>
      <Button color="secondary" onClick={reset}>Reset</Button>
      <Link to="/"><Button color="danger">Cancel</Button></Link>
    </form>
  );
};

GeneralSettingsForm = reduxForm({
  form: "generalSettings",
})(GeneralSettingsForm);

export default class General extends Component {
  render() {
    const settings = new Settings({locale: "en_US"});
    return (
      <Container fluid>
        <Row>
          <Col sm="12" lg="12">
            <h2>General</h2>
          </Col>
        </Row>
        <Row>
          <Col sm="12" lg="12">
            <GeneralSettingsForm initialValues={settings} onSubmit={()=>{}} />
          </Col>
        </Row>
      </Container>
    );
  }
}
