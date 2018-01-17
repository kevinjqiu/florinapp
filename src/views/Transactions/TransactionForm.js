import React, { Component } from "react";
import { Label, FormFeedback, Col, FormGroup, Button } from "reactstrap";
import InputField from "../../components/InputField/InputField";
import { Field } from "redux-form";
import { Link } from "react-router-dom";

class TransactionForm extends Component {

  render() {
    const { editMode, handleSubmit, onSubmit, reset } = this.props;

    return <form className="form-horizontal" onSubmit={handleSubmit(onSubmit)}>
      <Field name="date" label="Date" component={InputField} />
      <Field name="account" label="Account" component={InputField} />
      <Field name="name" label="Name" component={InputField} />
      <Field name="memo" label="Memo" component={InputField} />
      <Field name="amount" label="Amount" component={InputField} />
      <Field name="category" label="Category" component={InputField} />
      <Field name="info" label="Info (Note)" component={InputField} />
      <Field name="linked" label="Linked Transaction" component={InputField} />

      <Button type="submit" color="primary">
        {editMode ? "Save" : "Create"}
      </Button>
      <Button color="secondary" onClick={reset}>
        {editMode ? "Reset" : "Clear"}
      </Button>
      <Link to="/transactions">
        <Button color="danger">{editMode ? "Cancel" : "Discard"}</Button>
      </Link>
    </form>
  }
}

export default TransactionForm;