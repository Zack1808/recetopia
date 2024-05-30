import React from "react";

import { RegistrationErrorState } from "./states";
import { AppDispatch } from "../store";

export interface UseRegisterUserProps {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setErrors: React.Dispatch<React.SetStateAction<RegistrationErrorState>>;
  dispatch: AppDispatch;
}
