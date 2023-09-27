import { combineReducers } from "redux";

// Importing all the reducers
import { loginReducer } from "./loginReducer";
import { recipesReducer } from "./recipesReducer";

// Creating a reducer that will hold all the application reducers
export const rootReducer = combineReducers({
  user: loginReducer,
  recipes: recipesReducer,
});
