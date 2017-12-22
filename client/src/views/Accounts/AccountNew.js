import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Input,
  Label,
  FormGroup,
  CardFooter
} from "reactstrap";
import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";

const AccountTypeSelector = () => {
  return (
    <Field name="type" component="select" type="select" className="form-control">
      <option value="CHECKING">Checking</option>
      <option value="SAVINGS">Savings</option>
      <option value="CREDIT_CARD">Credit Card</option>
      <option value="INVESTMENT">Investment</option>
    </Field>
  );
};

const newAccountForm = props => {
  const {handleSubmit} = props;
  const onSubmit = props => console.log(props);
  return <form className="form-horizontal" onSubmit={handleSubmit(onSubmit)}>
      <FormGroup row>
        <Col md="3">
          <Label htmlFor="name">Account Name</Label>&nbsp;
        </Col>
        <Col xs="12" md="9">
          <Field name="name" component="input" type="text" className="form-control"/>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Col md="3">
          <Label htmlFor="name">Financial Institution</Label>&nbsp;
        </Col>
        <Col xs="12" md="9">
          <Field name="financialInstitution" component="input" type="text" className="form-control"/>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Col md="3">
          <Label htmlFor="name">Account Type</Label>&nbsp;
        </Col>
        <Col xs="12" md="9">
          <Field name="type" component={AccountTypeSelector} />
        </Col>
      </FormGroup>
      <Button type="submit" color="primary">
        Create
      </Button>
      <Button color="secondary">Cancel</Button>
    </form>;
};

const NewAccountForm = reduxForm({ form: "newAccount" })(newAccountForm);

export default class AccountNew extends Component {
  render() {
    const submit = (props, e) => {
      console.log(props);
    }
    return (
      <Row>
        <Col xs="12" lg="12">
          <Card>
            <CardHeader>
              <strong>New Account</strong>
            </CardHeader>
            <CardBody>
              <NewAccountForm onSubmit={submit} />
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}
