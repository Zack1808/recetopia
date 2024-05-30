import React from "react";

import { RegistrationErrorState } from "./states";

export interface PasswordValidityProps {
  password: string;
  setErrors: React.Dispatch<React.SetStateAction<RegistrationErrorState>>;
}
