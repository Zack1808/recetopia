// Importing the actions object
import { LOGINACTIONS } from "../reducers/loginReducer";

// Creating the login action
export const login = (user) => ({
  type: LOGINACTIONS.LOGIN,
  payload: user,
});

// Creating the logout action
const logout = () => ({
  type: LOGINACTIONS.LOGOUT,
});
