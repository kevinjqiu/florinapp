import { combineReducers } from "redux";
import accounts from "./accounts";
import currentAccount from "./currentAccount";
import ui from "./ui";
import { reducer as notifications } from "react-notification-system-redux";
import { reducer as form } from "redux-form";
import { routerReducer as router } from "react-router-redux";

export default combineReducers({
  router,
  accounts,
  currentAccount,
  ui,
  notifications,
  form
});
