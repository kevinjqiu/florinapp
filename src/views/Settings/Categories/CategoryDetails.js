import React, { Component } from "react";
import { Row, Col, Container } from "reactstrap";
import { connect } from "react-redux";
import CategoryForm from "./CategoryForm";
import { reduxForm } from "redux-form";
import * as actions from "../../../actions";
import Category from "../../../models/Category";

const EditCategoryForm = reduxForm({
  form: "editCategory"
})(CategoryForm);

class CategoryDetails extends Component {

  render() {
    const { categoryId } = this.props.match.params;
    const { categories, updateCategory } = this.props;

    const category = categories.filter(c => c._id === categoryId)[0];

    if (!category) {
      return <h3>No such category found</h3>
    }

    return <Container fluid>
        <Row>
          <Col xs="12" lg="12">
            <h3>Category Details</h3>
          </Col>
        </Row>
        <Row>
          <Col xs="12" lg="12">
            <EditCategoryForm editMode initialValues={category} onSubmit={props => {
              updateCategory(categoryId, new Category(props));
            }} />
          </Col>
        </Row>
      </Container>;
  }
}

const mapStateToProps = ({ categories }) => {
  return { categories: categories.categories };
}

export default connect(mapStateToProps, actions)(CategoryDetails);