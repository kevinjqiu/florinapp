import React, { Component } from "react";
import { Route } from "react-router-dom";
import CategoryList from "./CategoryList";
import CategoryNew from "./CategoryNew";
import CategoryDetails from "./CategoryDetails";

export default class Categories extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <Route exact path="/settings/categories" component={CategoryList} />
        <Route exact path="/settings/categories/new" component={CategoryNew} />
        <Route exact path="/settings/categories/:categoryId/view" component={CategoryDetails} />
      </div>
    );
  }
}
