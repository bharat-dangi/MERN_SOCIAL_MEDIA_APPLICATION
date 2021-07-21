import { combineReducers } from "redux";
import authReducer from "./auth";
import postReducer from "./post";
import userReducer from "./user";

export default combineReducers({
  authReducer,
  postReducer,
  userReducer,
});
