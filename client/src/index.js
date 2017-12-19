import React from "react";
import ReactDOM from "react-dom";
import "font-awesome/css/font-awesome.min.css";
import "simple-line-icons/css/simple-line-icons.css";
import registerServiceWorker from "./registerServiceWorker";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "./containers/App";
import "./style.css";
import reduxThunk from "redux-thunk";
import { applyMiddleware, createStore } from "redux";
import reducers from "./reducers";
import { Provider } from "react-redux";
import { createLogger } from "redux-logger";

const store = createStore(
  reducers,
  applyMiddleware(reduxThunk, createLogger())
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/" name="Home" component={App} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
