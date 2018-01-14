import React from "react";
import { Button, Col, Label, FormGroup, FormFeedback } from "reactstrap";
import { Field } from "redux-form";
import { Link } from "react-router-dom";
import { accountTypes } from "../../models/AccountType";
import { DropdownList } from "react-widgets";
import * as currencies from "currency-formatter/currencies.json";
import InputField from "../../components/InputField/InputField";

const currencyCodes = Object.keys(currencies);
currencyCodes.sort();

const AccountTypeSelector = ({ input, meta: { touched, error, warning } }) => {
  const options = touched ? { ...input, valid: !error } : { ...input };
  return (
    <div className="form-group">
      <FormGroup row>
        <Col md="3">
          <Label htmlFor="type">Account Type</Label>
        </Col>
        <Col xs="12" md="9">
          <DropdownList data={Object.keys(accountTypes)} {...options} />
          <FormFeedback>{error}</FormFeedback>
        </Col>
      </FormGroup>
    </div>
  );
};

const AccountCurrencySelector = ({ input, meta: { touched, error, warning } }) => {
  const options = touched ? { ...input, valid: !error } : { ...input };
  return (
    <div className="form-group">
      <FormGroup row>
        <Col md="3">
          <Label htmlFor="type">Account Currency</Label>
        </Col>
        <Col xs="12" md="9">
          <DropdownList allowCreate filter="contains" data={currencyCodes} textField={c => c ? `${currencies[c].code} (${currencies[c].symbol})` : ""} {...options} />
          <FormFeedback>{error}</FormFeedback>
        </Col>
      </FormGroup>
    </div>
  );
};

const required = value => (value ? undefined : "This field is required");

const validAccountType = value => {
  return value in accountTypes ? undefined : "Not a valid account type";
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
      <Field
        name="currency"
        component={AccountCurrencySelector}
      />
      <Button type="submit" color="primary">
        {editMode ? "Save" : "Create"}
      </Button>
      <Button color="secondary" onClick={reset}>
        {editMode ? "Reset" : "Clear"}
      </Button>
      <Link to="/accounts">
        <Button color="danger">{editMode ? "Cancel" : "Discard"}</Button>
      </Link>
    </form>
  );
};

export default AccountForm;
