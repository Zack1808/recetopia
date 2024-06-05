import React from "react";
import { NavigateFunction } from "react-router-dom";

import { RegistrationErrorState, LoginErrorState } from "./states";

export interface UseRegisterUserProps {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setErrors: React.Dispatch<React.SetStateAction<RegistrationErrorState>>;
}

export interface UseLoginUserProps {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setErrors: React.Dispatch<React.SetStateAction<LoginErrorState>>;
}

export interface useSendResetPasswordMailProps {
  setErrors: React.Dispatch<React.SetStateAction<LoginErrorState>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface useResetPasswordProps {
  setErrors: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  navigateTo: NavigateFunction;
}

export interface UseGetTagsProps {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface UseCreateRecipeProps {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  navigate: NavigateFunction;
}

export interface UseGetRecipesInfoProps {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
