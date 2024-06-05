export interface RegistrationErrorState {
  errorEmail: boolean;
  errorPassword: boolean;
  errorUserName: boolean;
}

export interface LoginErrorState extends RegistrationErrorState {}

export interface AddRecipeErrorState {
  errorTags: boolean;
  errorTime: boolean;
  errorPeople: boolean;
  errorIngredient: boolean;
  errorInstructions: boolean;
}

export interface RecipeInfoState {
  id: string;
  title: string;
  imageUrl: string;
  user: string;
}
