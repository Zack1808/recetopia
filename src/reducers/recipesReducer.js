// Creating the acitons
export const RECIPEACTIONS = {
  GET_RECIPES: "GET_RECIPES",
  CLEAR_RECIPES: "CLEAR_RECIPES",
};

// Setting up the initial state
const initialState = {
  recipes: [],
};

// Setting up the reducer
export const recipesReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECIPEACTIONS.GET_RECIPES:
      return { ...state, recipes: action.payload };
    case RECIPEACTIONS.CLEAR_RECIPES:
      return { ...state, recipes: [] };
    default:
      return state;
  }
};
