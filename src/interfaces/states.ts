export interface RegistrationErrorState {
  errorEmail: boolean;
  errorPassword: boolean;
  errorUserName: boolean;
}

export interface LoginErrorState extends RegistrationErrorState {}
