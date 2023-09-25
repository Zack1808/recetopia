// Importing the actions object
import { LOGINACTIONS } from "../reducers/loginReducer";

// Creating the login action
export const loginDispatcher = (user) => ({
  type: LOGINACTIONS.LOGIN,
  payload: user,
});

// Creating the logout action
export const logoutDispatcher = () => ({
  type: LOGINACTIONS.LOGOUT,
});
