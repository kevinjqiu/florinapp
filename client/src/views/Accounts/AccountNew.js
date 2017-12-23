import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Label,
  FormGroup,
  Input,
  FormFeedback
} from "reactstrap";
import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import * as actions from "../../actions";
import { connect } from "react-redux";

const AccountTypeSelector = ({
  input,
  meta: { touched, error, warning }
}) => {
  const options = (touched ? {...input, valid: !error} : {...input});
  return <div className="form-group">
      <FormGroup row>
        <Col md="3">
          <Label htmlFor="type">Account Type</Label>
        </Col>
        <Col xs="12" md="9">
          <Input name="type" type="select" {...options} >
            <option value="" />
            <option value="CHECKING">Checking</option>
            <option value="SAVINGS">Savings</option>
            <option value="CREDIT_CARD">Credit Card</option>
            <option value="INVESTMENT">Investment</option>
          </Input>
          <FormFeedback>{error}</FormFeedback>
        </Col>
      </FormGroup>
    </div>;
};

const required = value => (value ? undefined : "This field is required");

const validAccountType = value => {
  // TODO: refactor
  return ["CHECKING", "SAVINGS", "CREDIT_CARD", "INVESTMENT"].indexOf(value) !== -1
    ? undefined
    : "Not a valid account type";
}

const InputField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => {
  const options = (touched ? {...input, valid: !error} : {...input});
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

const newAccountForm = ({ onSubmit, handleSubmit, reset }) => {
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
      <Field name="type" component={AccountTypeSelector} validate={[validAccountType]}/>
      <Button type="submit" color="primary">
        Create
      </Button>
      <Button color="secondary" onClick={reset}>
        Clear
      </Button>
      <Button color="danger">Cancel</Button>
    </form>
  );
};

const NewAccountForm = reduxForm({ form: "newAccount" })(newAccountForm);

export class AccountNew extends Component {
  render() {
    const {createAccount} = this.props;
    return (
      <Row>
        <Col xs="12" lg="12">
          <Card>
            <CardHeader>
              <strong>New Account</strong>
            </CardHeader>
            <CardBody>
              <NewAccountForm onSubmit={props => createAccount(props)} />
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default connect(null, actions)(AccountNew);