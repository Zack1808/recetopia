import React from "react";

import { RegistrationErrorState, LoginErrorState } from "./states";
import { AppDispatch } from "../store";

export interface UseRegisterUserProps {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setErrors: React.Dispatch<React.SetStateAction<RegistrationErrorState>>;
  dispatch: AppDispatch;
}

export interface UseLoginUserProps {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setErrors: React.Dispatch<React.SetStateAction<LoginErrorState>>;
  dispatch: AppDispatch;
}

export interface useSendResetPasswordMailProps {
  setErrors: React.Dispatch<React.SetStateAction<LoginErrorState>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface useResetPasswordProps {
  setErrors: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
