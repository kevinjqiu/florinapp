import React, { Component } from "react";
import {
  Alert,
  Row,
  Container,
  Col,
  Table,
  Badge,
  Button,
  ButtonGroup
} from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import RefreshButton from "../../../components/RefreshButton/RefreshButton";
import { categoryTypes } from "../../../models/CategoryType";
import DeleteButton from "../../../components/ListActionButton/DeleteButton";
import ViewButton from "../../../components/ListActionButton/ViewButton";
import ListActionButton from "../../../components/ListActionButton/ListActionButton";

class CategoryTable extends Component {
  render() {
    const { categories, loading, failed } = this.props;
    const categoryTypeToColor = {
      [categoryTypes.EXPENSE]: "danger",
      [categoryTypes.INCOME]: "success",
      [categoryTypes.TRANSFER]: "secondary"
    };

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
            <th></th>
            <th>Name</th>
            <th>Type</th>
            <th style={{ textAlign: "center" }}>Allow Transactions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(category => {
            return <tr key={category._id}>
                <td style={{ textAlign: "right" }}>
                  <ButtonGroup>
                    {category.isParent() ? <Link to={`/settings/categories/new?parent=${category._id}&type=${category.type}`}>
                        <ListActionButton id={category._id} tooltip="Create a subcategory in this top-level category" color="success" icon="fa-plus-square-o" />
                      </Link> : <ListActionButton id={category._id} tooltip="Creating subcategory is only applicable to a top-level category" color="success" icon="fa-plus-square-o" disabled={true} />}

                    <Link to={`/settings/categories/${category._id}/view`}>
                      <ViewButton objectId={category._id} />
                    </Link>
                    <DeleteButton objectId={category._id} onClick={() => {
                        console.log("TODO");
                      }} />
                  </ButtonGroup>
                </td>
                <td>
                  <Link to={`/settings/categories/${category._id}/view`}>
                    {category.parent ? category.name : <strong>
                        <h4>{category.name}</h4>
                      </strong>}
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
    const { categoriesState, fetchCategories, seedCategories } = this.props;
    return (
      <Container fluid>
        <Row>
          <Col xs="12" lg="12">
            <h3>Categories</h3>
          </Col>
        </Row>
        <Row>
          <Col xs="12" lg="12">
            <ButtonGroup>
              <Link to="/settings/categories/new">
                <Button
                  color="success"
                  size="sm"
                  outline
                >
                  <i className="fa fa-plus" aria-hidden="true" />
                  {"\u00A0"}Add
                </Button>
              </Link>
              <Button
                color="success"
                size="sm"
                outline
                onClick={() => {
                  seedCategories();
                  fetchCategories();
                }}
              >
                <i className="fa fa-magic" aria-hidden="true" />
                {"\u00A0"}Seed
              </Button>
              <RefreshButton onClick={fetchCategories} />
            </ButtonGroup>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col xs="12" lg="12">
            <CategoryTable {...categoriesState} />
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = ({ categories }) => {
  return { categoriesState: categories };
};

export default connect(mapStateToProps, actions)(CategoryList);
