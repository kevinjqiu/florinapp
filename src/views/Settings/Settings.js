import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import Sync from "./Sync/Sync";

const General = () => {
  return <div>General</div>
}

const Categories = () => {
  return <div>Categories</div>
}

const Tags = () => {
  return <div>Tags</div>
}

export default () => {
  return <div className="animated fadeIn">
      <Route exact path="/settings/general" component={General} />
      <Route exact path="/settings/categories" component={Categories} />
      <Route exact path="/settings/tags" component={Tags} />
      <Route exact path="/settings/sync" component={Sync} />
    </div>;
};
