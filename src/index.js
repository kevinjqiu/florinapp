import React from "react";
import ReactDOM from "react-dom";
import "font-awesome/css/font-awesome.min.css";
import "simple-line-icons/css/simple-line-icons.css";
import registerServiceWorker from "./registerServiceWorker";
import { Switch, Route } from "react-router-dom";
import App from "./containers/App";
import "./style.css";
import reduxThunk from "redux-thunk";
import { applyMiddleware, createStore } from "redux";
import reducers from "./reducers";
import { Provider } from "react-redux";
import { createLogger } from "redux-logger";
import { routerMiddleware, ConnectedRouter } from "react-router-redux";
import createHistory from "history/createBrowserHistory";
import 'react-widgets/dist/css/react-widgets.css';

const history = createHistory();

const store = createStore(
  reducers,
  {},
  applyMiddleware(reduxThunk, createLogger(), routerMiddleware(history))
);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/" name="Home" component={App} />
      </Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
