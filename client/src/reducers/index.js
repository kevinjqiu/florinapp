import { combineReducers } from "redux";
import accounts from "./accounts";
import ui from "./ui";
import {reducer as notifications} from 'react-notification-system-redux';

export default combineReducers({
  accounts,
  ui,
  notifications
});
