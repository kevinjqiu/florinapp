import React, { Component } from "react";
import { Label, FormFeedback, Col, FormGroup, Button } from "reactstrap";
import { Field } from "redux-form";
import { Link } from "react-router-dom";
import InputField from "../../../components/InputField/InputField";
import { DropdownList } from "react-widgets";
import Switch from "../../../components/Switch/Switch";
import { categoryTypes } from "../../../models/CategoryType";
import { connect } from "react-redux";
import RefreshButton from "../../../components/RefreshButton/RefreshButton";
import * as actions from "../../../actions";
import { fetchCategories } from "../../../actions";

const required = value => (value ? undefined : "This field is required");

const CategoryTypeSelector = ({ input, meta: { touched, error, warning } }) => {
  const options = touched ? { ...input, valid: !error } : { ...input };
  return (
    <div className="form-group">
      <FormGroup row>
        <Col md="3">
          <Label htmlFor="type">Category Type</Label>
        </Col>
        <Col xs="12" md="9">
          <DropdownList
            data={Object.keys(categoryTypes)}
            {...options}
          />
          <FormFeedback>{error}</FormFeedback>
        </Col>
      </FormGroup>
    </div>
  );
};

const ParentCategorySelector = ({
  input,
  meta: { touched, error, warning, initial },
  parentCategories,
  onRefresh
}) => {
  const options = touched ? { ...input, valid: !error } : { ...input };
  return (
    <FormGroup row>
      <Col md="3">
        <Label htmlFor="type">Parent Category</Label>
        {" "}
        <RefreshButton withCaption={false} onClick={(e) => {
          e.preventDefault();
          onRefresh();
        }} />
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
  );
};

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
            {...options}
          />
        </Col>
      </FormGroup>
    </div>
  );
}

class CategoryForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showParentSelector: props.initialValues.parent !== null
    };
  }

  componentDidMount() {
    if (this.props.categories.length === 0) {
      this.props.fetchCategories();
    }
  }

  render() {
    const {
      categories,
      editMode,
      reset,
      onSubmit,
      handleSubmit
    } = this.props;
    const parentCategories = categories.filter(c => !c.parent);
    return (
      <form className="form-horizontal" onSubmit={handleSubmit(onSubmit)}>
        <Field
          name="name"
          label="Category Name"
          component={InputField}
          validate={[required]}
        />
        <Field name="type" label="Type" component={CategoryTypeSelector} />
        <FormGroup row>
          <Col xs="12" md="9">
            <Switch
              text="This is a top-level category"
              tooltipId="parent-id-select"
              tooltipText="Click to choose a parent id"
              onChange={() => {
                this.setState({
                  showParentSelector: !this.state.showParentSelector
                });
              }}
              defaultChecked={!this.state.showParentSelector}
            />
          </Col>
        </FormGroup>
        {this.state.showParentSelector ? (
          <Field
            name="parent"
            label="Parent Category"
            component={ParentCategorySelector}
            parentCategories={parentCategories}
            onRefresh={fetchCategories}
          />
        ) : (
          ""
        )}
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
  }
}

const mapStateToProps = (state) => {
  const categoriesState = state.categories;
  const { categories } = categoriesState;
  return { categories }
}

export default connect(mapStateToProps, actions)(CategoryForm);