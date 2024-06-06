import React, { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { QueryDocumentSnapshot } from "firebase/firestore";
import { useLocation } from "react-router-dom";

import Card from "../components/Card";
import Button from "../components/Button";

import { RecipeInfoState } from "../interfaces/states";

import { useGetRecipesInfo } from "../hooks/data";

const RecipesDisplay: React.FC = () => {
  const [recipes, setRecipes] = useState<RecipeInfoState[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [lastRecipe, setLastRecipe] = useState<QueryDocumentSnapshot | null>(
    null
  );

  const location = useLocation();

  const { getRecipesInfo } = useGetRecipesInfo({
    setIsLoading,
    setLastRecipe,
    lastRecipe,
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    const fetch = async () => {
      const recipesList = await getRecipesInfo({
        sortBy: !!searchParams.size
          ? location.search.replace("?", "")
          : "createdOn",
      });
      if (recipesList && recipesList.length > 0) setRecipes(recipesList);
    };

    fetch();
  }, []);

  const fetchMoreRecipes = async () => {
    const searchParams = new URLSearchParams(location.search);
    const recipesList = await getRecipesInfo({
      sortBy: !!searchParams ? location.search.replace("?", "") : "createdOn",
      getNewList: true,
    });
    if (recipesList && recipesList.length > 0)
      setRecipes((prevState) => [...prevState, ...recipesList]);
  };

  return (
    <div className="w-full max-w-screen-2xl pt-5 flex flex-col gap-10 mx-auto p-3 items-start">
      {location.search === "?likes.likeCount" ? (
        <h1 className="text-4xl font-bold text-gray-700">
          Most <span className="text-orange-400">liked</span>
        </h1>
      ) : (
        <h1 className="text-4xl font-bold text-gray-700">
          Most <span className="text-orange-400">recent</span>
        </h1>
      )}
      {isLoading ? (
        <div className="absolute top-1/2 left-0 flex w-full justify-center ">
          <ClipLoader color="rgb(251 146 60)" size={100} />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 w-full sm:grid-cols-3 gap-5">
            {recipes.length > 0 ? (
              recipes.map((recipe) => (
                <Card
                  key={recipe.id}
                  user={recipe.user}
                  image={recipe.imageUrl}
                  title={recipe.title}
                  id={recipe.id}
                />
              ))
            ) : (
              <h2>No recipes</h2>
            )}
          </div>
          {lastRecipe && (
            <Button
              className="justify-center self-center"
              onClick={fetchMoreRecipes}
              primary
            >
              Load More
            </Button>
          )}
        </>
      )}
    </div>
  );
};

export default RecipesDisplay;
