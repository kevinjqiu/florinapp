import { combineReducers } from "redux";
import accounts from "./accounts";
import currentAccount from "./currentAccount";
import transactions from "./transactions";
import ui from "./ui";
import categories from "./categories";
import globals from "./globals";
import { reducer as notifications } from "react-notification-system-redux";
import { reducer as form } from "redux-form";
import { routerReducer as router } from "react-router-redux";

export default combineReducers({
  router,
  globals,
  accounts,
  transactions,
  categories,
  currentAccount,
  ui,
  notifications,
  form
});
