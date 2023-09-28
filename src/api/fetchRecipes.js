import axios from "axios";

// Creating the funciton that will fetch all recipes
export const fetchAllRecipes = async () => {
  const { data } = await axios.get(
    "https://getrecipes-zazjbx7nka-uc.a.run.app/",
    {
      headers: {
        authid: process.env.REACT_APP_AUTHID,
      },
    }
  );
  return data;
};

// Creating the function that will add a recipe to the recipes list
export const addRecipe = async (body) => {
  const { data } = await axios.post(
    "https://addrecipe-zazjbx7nka-uc.a.run.app/",
    body,
    {
      headers: {
        authid: process.env.REACT_APP_AUTHID,
      },
    }
  );
  return data;
};
