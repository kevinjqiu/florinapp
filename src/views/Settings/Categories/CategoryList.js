import React, { Component } from "react";
import {
  Alert,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Table,
  Badge,
  Button,
  ButtonGroup,
  Label,
  Input
} from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import RefreshButton from "../../../components/RefreshButton/RefreshButton";
import { categoryTypes } from "../../../models/CategoryType";

class CategoryTable extends Component {
  render() {
    const { categories, loading, failed } = this.props;
    const categoryTypeToColor = {
      [categoryTypes.EXPENSE]: "danger",
      [categoryTypes.INCOME]: "success",
      [categoryTypes.TRANSFER]: "secondary"
    }

    if (loading) {
      return (
        <i
          className="fa fa-spinner fa-spin fa-3x fa-fw"
          style={{ fontSize: "8em" }}
        />
      );
    }

    if (failed) {
      return (
        <Alert color="danger">
          Loading categories failed. Try again later...
        </Alert>
      );
    }

    if (categories.length === 0 && !loading) {
      return <h2>No categories found.</h2>;
    }

    return (
      <Table responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th style={{ textAlign: "center" }}>Allow Transactions</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(category => {
            return <tr id={category._id}>
                <td>
                  <Link to={`/settings/categories/${category._id}/view`}>
                  {category.parent ? (
                    category.name
                  ) : (
                    <strong>{category.name}</strong>
                  )}
                  </Link>
                </td>
                <td>
                  <Badge pill color={categoryTypeToColor[category.type]}>
                    {category.type}
                  </Badge>
                </td>
                <td style={{ textAlign: "center" }}>
                  {category.allowTransactions ? (
                    <i
                      className="fa fa-check-square-o"
                      aria-hidden="true"
                    />
                  ) : (
                    <i
                      className="fa fa-square-o"
                      aria-hidden="true"
                    />
                  )}
                </td>
                <td>
                <ButtonGroup>
                  <Link to={`/settings/categories/${categories._id}/view`}>
                    <Button color="primary" size="sm">
                      <i className="fa fa-pencil-square-o" aria-hidden="true" />
                    </Button>
                  </Link>
                  <Button
                    color="danger"
                    size="sm"
                    onClick={() => {}}
                  >
                    <i className="fa fa-trash" aria-hidden="true" />
                  </Button>
                </ButtonGroup>
                </td>
              </tr>;
          })}
        </tbody>
      </Table>
    );
  }
}
class CategoryList extends Component {
  componentWillMount() {
    this.props.fetchCategories();
  }

  render() {
    const { categoriesState, fetchCategories } = this.props;
    const { loading, categories } = categoriesState;
    return (
      <Row>
        <Col xs="12" lg="12">
          <Card>
            <CardHeader>
              <strong>Categories</strong>
              {loading ? (
                <i className="fa fa-refresh fa-spin fa-1x fa-fw" />
              ) : (
                <span />
              )}
              <ButtonGroup className="float-right">
                <RefreshButton onClick={fetchCategories} />
              </ButtonGroup>
            </CardHeader>
            <CardBody>
              <CategoryTable {...categoriesState} />
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ categories }) => {
  return { categoriesState: categories };
};

export default connect(mapStateToProps, actions)(CategoryList);
