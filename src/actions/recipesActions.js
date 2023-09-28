// Import the actions object
import { RECIPESACTIONS } from "../reducers/recipesReducer";

// Setting up the action for storing the recipes
export const getRecipesDispatcher = (recipes) => ({
  type: RECIPESACTIONS.GET_RECIPES,
  payload: recipes,
});

// Setting up the action for clearing the state
export const clearRecipesDispatcher = () => ({
  type: RECIPESACTIONS.CLEAR_RECIPES,
});
