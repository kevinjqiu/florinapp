import { combineReducers } from "redux";
import accounts from "./accounts";
import ui from "./ui";
import { reducer as notifications } from "react-notification-system-redux";
import { reducer as form } from "redux-form";

export default combineReducers({
  accounts,
  ui,
  notifications,
  form
});
