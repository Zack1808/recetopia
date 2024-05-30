export interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
}

export interface User {
  userName: string;
  email: string;
  uid: string;
}

export interface RegistrationErrorState {
  errorEmail: boolean;
  errorPassword: boolean;
  errorUserName: boolean;
}
