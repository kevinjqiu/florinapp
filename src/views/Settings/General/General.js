import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button, FormFeedback, FormGroup, Label } from "reactstrap";
import { Field, reduxForm } from "redux-form";
import { DropdownList } from "react-widgets";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import Settings from "../../../models/Settings";

const LOCALES = ["en_US", "en_GB", "en_CA"];

const LocaleField = ({ input, label, meta: { touched, error } }) => {
  let options = touched ? { ...input, valid: !error } : { ...input };
  return (
    <div className="form-group">
      <FormGroup row>
        <Col md="3">
          <Label htmlFor="{input.name}">{label}</Label>
        </Col>
        <Col xs="12" md="9">
          <DropdownList
            data={LOCALES}
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
      <Field name="locale" label="Locale" component={LocaleField} />
      <Button type="submit" color="primary">Save</Button>
      <Button color="secondary" onClick={reset}>Reset</Button>
      <Link to="/"><Button color="danger">Cancel</Button></Link>
    </form>
  );
};

GeneralSettingsForm = reduxForm({
  form: "generalSettings",
})(GeneralSettingsForm);

class General extends Component {
  componentDidMount() {
    this.props.fetchSettings();
  }

  render() {
    const { settings, updateSettings } = this.props;
    return (
      <Container fluid>
        <Row>
          <Col sm="12" lg="12">
            <h2>General</h2>
          </Col>
        </Row>
        <Row>
          <Col sm="12" lg="12">
            <GeneralSettingsForm initialValues={settings} onSubmit={(props)=>{
              const settings = new Settings(props);
              console.log(settings);
              updateSettings(settings);
            }} />
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = ({ settings }) => {
  return {
    settings: settings.settings
  }
}

export default connect(mapStateToProps, actions)(General);