import React, { Component } from "react";
import { Label, FormFeedback, Col, FormGroup, Button } from "reactstrap";
import { Field, initialize } from "redux-form";
import { Link } from "react-router-dom";
import InputField from "../../../components/InputField/InputField";
import { DropdownList } from "react-widgets";
import Switch from "../../../components/Switch/Switch";

const required = value => (value ? undefined : "This field is required");

const CategoryTypeSelector = ({ input, meta: { touched, error, warning } }) => {
  const options = touched ? { ...input, valid: !error } : { ...input };
  const categoryTypes = ["INCOME", "EXPENSE", "TRANSFER"];
  return (
    <div className="form-group">
      <FormGroup row>
        <Col md="3">
          <Label htmlFor="type">Category Type</Label>
        </Col>
        <Col xs="12" md="9">
          <DropdownList
            data={categoryTypes}
            {...options}
          />
          <FormFeedback>{error}</FormFeedback>
        </Col>
      </FormGroup>
    </div>
  );
};

class ParentCategorySelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showParentSelector: props.meta.initial !== null
    };
  }

  render() {
    const {
      input,
      meta: { touched, error, warning, initial },
      parentCategories
    } = this.props;
    const options = touched ? { ...input, valid: !error } : { ...input };
    const { showParentSelector } = this.state;
    return (
      <div className="form-group">
        <FormGroup row>
          <Col xs="12" md="9">
            <Switch
              text="This is a top-level category"
              tooltipId="parent-id-select"
              tooltipText="Click to choose a parent id"
              onChange={e => {
                this.setState({
                  showParentSelector: !showParentSelector
                });
              }}
              defaultChecked={initial === null}
            />
          </Col>
        </FormGroup>
        {showParentSelector ? (
          <FormGroup row>
            <Col md="3">
              <Label htmlFor="type">Parent Category</Label>
            </Col>
            <Col xs="12" md="9">
              <DropdownList
                data={parentCategories}
                filter="contains"
                textField="name"
                valueField="_id"
                groupBy="type"
                {...options}
              />
              <FormFeedback>{error}</FormFeedback>
            </Col>
          </FormGroup>
        ) : (
          ""
        )}
      </div>
    );
  }
}

const AllowTransactionsSelector = ({ input, meta: { touched, error, warning, initial } }) => {
  const options = touched ? { ...input, valid: !error } : { ...input };
  return (
    <div className="form-group">
      <FormGroup row>
        <Col xs="12" md="9">
          <Switch
            text="Allow Transactions?"
            tooltipId="allow-transactions-select"
            tooltipText="Check this option to allow transactions to be put in this category."
            defaultChecked={initial === true}
          />
        </Col>
      </FormGroup>
    </div>
  );
}

export default ({ categories, editMode, reset, onSubmit, handleSubmit, initialValues }) => {
  const parentCategories = categories.filter(c => !c.parent);
  return (
    <form className="form-horizontal" onSubmit={handleSubmit(onSubmit)}>
      <Field
        name="name"
        label="Category Name"
        component={InputField}
        validate={[required]}
      />
      <Field
        name="type"
        label="Type"
        component={CategoryTypeSelector}
      />
      <Field
        name="parent"
        label="Parent Category"
        component={ParentCategorySelector}
        parentCategories={parentCategories}
      />
      <Field
        name="allowTransactions"
        label="Allow Transactions?"
        component={AllowTransactionsSelector}
      />
      <Button type="submit" color="primary">
        {editMode ? "Save" : "Create"}
      </Button>
      <Button color="secondary" onClick={reset}>
        {editMode ? "Reset" : "Clear"}
      </Button>
      <Link to="/settings/categories">
        <Button color="danger">{editMode ? "Cancel" : "Discard"}</Button>
      </Link>
    </form>
  );
};
