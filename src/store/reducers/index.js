import { combineReducers } from "redux";

import loginReducer from "./loginReducer";
import signupReducer from "./loginReducer";

const reducers = combineReducers({
  loginReducer,
  signupReducer,
});
export default reducers;
