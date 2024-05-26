import { RegistrationState, User } from "../interfaces/registration";
import { RegistrationActionTypes } from "../enums";

const initialState: RegistrationState = {
  isLoggedIn: false,
  user: null,
};

type Actions = {
  type:
    | RegistrationActionTypes.LOGIN
    | RegistrationActionTypes.REGISTER
    | RegistrationActionTypes.SIGNOUT;
  payload: User | null;
};

export const registrationReducer = (
  state: RegistrationState = initialState,
  action: Actions
) => {
  switch (action.type) {
    case RegistrationActionTypes.LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
      };
    case RegistrationActionTypes.REGISTER:
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
      };
    case RegistrationActionTypes.SIGNOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    default:
      return state;
  }
};
