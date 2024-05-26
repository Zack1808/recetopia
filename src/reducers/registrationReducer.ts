interface RegistrationState {
  isLoggedIn: boolean;
  user: {
    userName: string;
    email: string;
    uid: string;
  } | null;
}

const initialState: RegistrationState = {
  isLoggedIn: false,
  user: null,
};

export const registrationReducer = (
  state: RegistrationState = initialState,
  action: any
) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
      };
    case "REGISTER":
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
      };
    case "SIGNOUT":
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    default:
      return state;
  }
};
