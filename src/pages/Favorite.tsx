import React, { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { QueryDocumentSnapshot } from "firebase/firestore";

import Card from "../components/Card";
import Button from "../components/Button";

import { RecipeInfoState } from "../interfaces/states";

import { useGetRecipesInfo } from "../hooks/data";

const Favorite: React.FC = () => {
  const [favorites, setFavorites] = useState<RecipeInfoState[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [lastRecipe, setLastRecipe] = useState<QueryDocumentSnapshot | null>(
    null
  );

  const { getRecipesInfo } = useGetRecipesInfo({
    setIsLoading,
    setLastRecipe,
    lastRecipe,
  });

  useEffect(() => {
    const fetch = async () => {
      const favs = await getRecipesInfo({ favorite: true });
      if (favs && favs.length > 0) setFavorites(favs);
    };

    fetch();
  }, []);

  const fetchMoreFavoriteRecipes = async () => {
    const favs = await getRecipesInfo({ favorite: true, getNewList: true });
    if (favs && favs.length > 0)
      setFavorites((prevState) => [...prevState, ...favs]);
  };

  return (
    <div className="w-full max-w-screen-2xl pt-5 flex flex-col gap-10 mx-auto p-3 items-start mb-10">
      <h1 className="text-4xl font-bold text-gray-700">
        My <span className="text-orange-400">favorites</span>
      </h1>
      {isLoading ? (
        <div className="absolute top-1/2 left-0 flex w-full justify-center ">
          <ClipLoader color="rgb(251 146 60)" size={100} />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 w-full">
            {favorites.length > 0 ? (
              favorites.map((recipe) => (
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
              onClick={fetchMoreFavoriteRecipes}
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

export default Favorite;
