import axios from "axios";

// Creating the funciton that will fetch all recipes
const fetchAllRecipes = async () => {
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
