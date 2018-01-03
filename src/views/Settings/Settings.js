import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

const General = () => {
  return <div>General</div>
}

const Categories = () => {
  return <div>Categories</div>
}

const Tags = () => {
  return <div>Tags</div>
}

const Sync = () => {
  return <div>Sync</div>
}

export default () => {
  return <div className="animated fadeIn">
      <Route exact path="/settings/general" component={General} />
      <Route exact path="/settings/categories" component={Categories} />
      <Route exact path="/settings/tags" component={Tags} />
      <Route exact path="/settings/sync" component={Sync} />
      <Redirect from="/settings" to="/settings/general" />
    </div>;
};
