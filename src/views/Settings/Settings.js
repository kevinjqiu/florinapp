import React from "react";
import { Route } from "react-router-dom";
import Sync from "./Sync/Sync";
import Categories from "./Categories/Categories";
import General from "./General/General";

const Tags = () => {
  return <div>Tags</div>
}

export default () => {
  return <div className="animated fadeIn">
      <Route exact path="/settings/general" component={General} />
      <Route path="/settings/categories" component={Categories} />
      <Route exact path="/settings/tags" component={Tags} />
      <Route exact path="/settings/sync" component={Sync} />
    </div>;
};
