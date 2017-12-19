import { combineReducers } from "redux";
import accounts from "./accounts";
import ui from "./ui";

export default combineReducers({
  accounts,
  ui
});
