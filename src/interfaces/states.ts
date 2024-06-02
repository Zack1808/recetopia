export interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
}

export interface User {
  userName: string | null;
  email: string | null;
  uid: string;
}

export interface RegistrationErrorState {
  errorEmail: boolean;
  errorPassword: boolean;
  errorUserName: boolean;
}

export interface LoginErrorState extends RegistrationErrorState {}
