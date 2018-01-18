import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import { connect } from "react-redux";
import _CategoryForm from "./CategoryForm";
import { reduxForm } from "redux-form";
import Category from "../../../models/Category";
import * as actions from "../../../actions";
import * as queryString from "query-string";

const newCategoryForm = ({ type, parent }) => {
  return reduxForm({
    initialValues: { type, parent },
    form: "newCategory"
  })(_CategoryForm);
};

class CategoryNew extends Component {
  render() {
    const { createCategory, parent, type } = this.props;
    const CategoryForm = newCategoryForm({ type, parent });
    return (
      <Container fluid>
        <Row>
          <Col xs="12" lg="12">
            <h3>New Category</h3>
          </Col>
        </Row>
        <Row>
          <Col xs="12" lg="12">
            <CategoryForm
              onSubmit={props => createCategory(new Category(props))}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = ({ router }) => {
  const { location } = router;
  const queryParams = queryString.parse(location.search);
  return {
    parent: queryParams.parent !== undefined ? queryParams.parent : null,
    type: queryParams.type !== undefined ? queryParams.type : "INCOME"
  };
};

export default connect(mapStateToProps, actions)(CategoryNew);
