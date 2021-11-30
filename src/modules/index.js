import { combineReducers } from "redux";
import nwitter from "./nwitter";
import auth from "./auth";
const rootReducer = combineReducers({
  nwitter,
  auth,
});

export default rootReducer;
