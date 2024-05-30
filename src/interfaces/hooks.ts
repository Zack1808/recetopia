import React from "react";

import { RegistrationErrorState, LoginErrorState } from "./states";
import { AppDispatch } from "../store";

export interface UseRegisterUserProps {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setErrors: React.Dispatch<React.SetStateAction<RegistrationErrorState>>;
  dispatch: AppDispatch;
}

export interface useLoginUserProps {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setErrors: React.Dispatch<React.SetStateAction<LoginErrorState>>;
  dispatch: AppDispatch;
}
