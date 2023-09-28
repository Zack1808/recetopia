// Creating the acitons
export const RECIPESACTIONS = {
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
    case RECIPESACTIONS.GET_RECIPES:
      return { ...state, recipes: action.payload };
    case RECIPESACTIONS.CLEAR_RECIPES:
      return { ...state, recipes: [] };
    default:
      return state;
  }
};
