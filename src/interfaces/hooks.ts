import React from "react";
import { NavigateFunction } from "react-router-dom";
import { QueryDocumentSnapshot } from "firebase/firestore";

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
  setLastRecipe?: React.Dispatch<
    React.SetStateAction<QueryDocumentSnapshot | null>
  >;
  lastRecipe?: QueryDocumentSnapshot | null;
}

export interface GetRecipesInfoOptions {
  amount?: number;
  sortBy?: string;
  getFromLoggedInUser?: boolean;
  favorite?: boolean;
  getNewList?: boolean;
}

export interface UseGetRecipe {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  uid: string;
}
