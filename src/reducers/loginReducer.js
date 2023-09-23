// Setting up the actions
export const LOGINACTIONS = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
};

// Creating the initial state for the login
const initialState = {
  isLoggedIn: false,
  user: null,
};

// Setting up the reducer
export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGINACTIONS.LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
      };
    case LOGINACTIONS.LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    default:
      return state;
  }
};
