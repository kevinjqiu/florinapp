import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import { connect } from "react-redux";
import CategoryForm from "./CategoryForm";
import { reduxForm } from "redux-form";

const NewCategoryForm = reduxForm({
  initialValues: { type: "INCOME", parent: null },
  form: "newCategory"
})(CategoryForm);

class CategoryNew extends Component {
  render() {
    const { categories } = this.props;
    return (
      <Container fluid>
        <Row>
          <Col xs="12" lg="12">
            <h3>New Category</h3>
          </Col>
        </Row>
        <Row>
          <Col xs="12" lg="12">
            <NewCategoryForm categories={categories} onSubmit={() => {}}/>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const categoriesState = state.categories;
  const { categories } = categoriesState;
  return { categories }
}

export default connect(mapStateToProps, null)(CategoryNew);