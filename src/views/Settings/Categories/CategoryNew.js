import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import { connect } from "react-redux";
import CategoryForm from "./CategoryForm";
import { reduxForm } from "redux-form";
import * as actions from "../../../actions";

const NewCategoryForm = reduxForm({
  initialValues: { type: "INCOME", parent: null },
  form: "newCategory"
})(CategoryForm);

class CategoryNew extends Component {
  render() {
    return (
      <Container fluid>
        <Row>
          <Col xs="12" lg="12">
            <h3>New Category</h3>
          </Col>
        </Row>
        <Row>
          <Col xs="12" lg="12">
            <NewCategoryForm onSubmit={() => {}}/>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default connect(null, actions)(CategoryNew);