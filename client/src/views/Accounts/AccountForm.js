import { Button, Col, Label, FormGroup, Input, FormFeedback } from "reactstrap";
import React from "react";
import { Field } from "redux-form";
import { Link } from "react-router-dom";
import { accountTypes } from "../../models/AccountType"

const AccountTypeSelector = ({ input, meta: { touched, error, warning } }) => {
  const options = touched ? { ...input, valid: !error } : { ...input };
  return (
    <div className="form-group">
      <FormGroup row>
        <Col md="3">
          <Label htmlFor="type">Account Type</Label>
        </Col>
        <Col xs="12" md="9">
          <Input name="type" type="select" {...options}>
            <option value="" />
            { Object.keys(accountTypes).map(key => <option key={key} value={key}>{accountTypes[key]}</option>) }
          </Input>
          <FormFeedback>{error}</FormFeedback>
        </Col>
      </FormGroup>
    </div>
  );
};

const required = value => (value ? undefined : "This field is required");

const validAccountType = value => {
  return value in accountTypes;
};

const InputField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => {
  const options = touched ? { ...input, valid: !error } : { ...input };
  return (
    <div className="form-group">
      <FormGroup row>
        <Col md="3">
          <Label htmlFor="{input.name}">{label}</Label>
        </Col>
        <Col xs="12" md="9">
          <Input {...options} />
          <FormFeedback>{error}</FormFeedback>
        </Col>
      </FormGroup>
    </div>
  );
};

const AccountForm = ({ editMode, onSubmit, handleSubmit, reset, account }) => {
  return (
    <form className="form-horizontal" onSubmit={handleSubmit(onSubmit)}>
      <Field
        name="name"
        label="Account Name"
        component={InputField}
        validate={[required]}
      />
      <Field
        name="financialInstitution"
        label="Financial Institution"
        component={InputField}
        validate={[required]}
      />
      <Field
        name="type"
        component={AccountTypeSelector}
        validate={[validAccountType]}
      />
      <Button type="submit" color="primary">
        {editMode ? "Save" : "Create"}
      </Button>
      <Button color="secondary" onClick={reset}>
        Clear
      </Button>
      <Link to="/accounts">
        <Button color="danger">Cancel</Button>
      </Link>
    </form>
  );
};

export default AccountForm;
