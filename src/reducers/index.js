import { combineReducers } from "redux";

// Importing all the reducers
import { loginReducer } from "./loginReducer";

// Creating a reducer that will hold all the application reducers
export const rootReducer = combineReducers({
  login: loginReducer,
});
