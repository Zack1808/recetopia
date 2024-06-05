import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";

import Card from "../components/Card";
import Button from "../components/Button";

import { useGetRecipesInfo } from "../hooks/data";
import { useAuthStatus } from "../hooks/registrationHooks";

import { RecipeInfoState } from "../interfaces/states";

const Home: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [recentRecipes, setRecentRecipes] = useState<RecipeInfoState[]>([]);
  const [mostLiked, setMostLiked] = useState<RecipeInfoState[]>([]);
  const [userRecipes, setUserRecipes] = useState<RecipeInfoState[]>([]);

  const { getRecipesInfo } = useGetRecipesInfo({ setIsLoading });
  const { isLoggedIn, checkingStatus } = useAuthStatus();

  useEffect(() => {
    const fetch = async () => {
      const recents = await getRecipesInfo({ amount: 3, sortBy: "createdOn" });
      if (isLoggedIn) {
        const usersRecipe = await getRecipesInfo({
          amount: 3,
          sortBy: "createdOn",
          getFromLoggedInUser: true,
        });
        if (usersRecipe && usersRecipe.length > 0) setUserRecipes(usersRecipe);
        else {
          const liked = await getRecipesInfo({
            amount: 3,
            sortBy: "likes.likeCount",
          });
          if (liked && liked?.length > 0) setMostLiked(liked);
        }
      } else {
        const liked = await getRecipesInfo({
          amount: 3,
          sortBy: "likes.likeCount",
        });
        if (liked && liked?.length > 0) setMostLiked(liked);
      }
      if (recents && recents?.length > 0) setRecentRecipes(recents);
    };

    !checkingStatus && fetch();
  }, [checkingStatus, isLoggedIn]);

  return (
    <div className="w-full max-w-screen-2xl pt-5 flex flex-col gap-10 mx-auto p-3">
      <h1 className="text-4xl font-bold text-gray-700">
        Get inspired to <span className="text-orange-400">cook more.</span>
      </h1>
      {isLoading ? (
        <div className="absolute top-1/2 left-0 flex w-full justify-center">
          <ClipLoader color="rgb(251 146 60)" size={100} />
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-3">
            <h2 className="text-2xl font-semibold text-gray-700">
              Recently added
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {recentRecipes.length > 0 ? (
                recentRecipes.map((recipe) => (
                  <Card
                    key={recipe.id}
                    user={recipe.user}
                    image={recipe.imageUrl}
                    title={recipe.title}
                    id={recipe.id}
                  />
                ))
              ) : (
                <h3>No recipes</h3>
              )}
            </div>
            <Link to="/recipes" className="self-end">
              <Button primary>Check out more</Button>
            </Link>
          </div>
          {isLoggedIn && userRecipes.length > 0 ? (
            <div className="flex flex-col gap-3">
              <h2 className="text-2xl font-semibold text-gray-700">
                My recipes
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {userRecipes.length > 0 ? (
                  userRecipes.map((recipe) => (
                    <Card
                      key={recipe.id}
                      user={recipe.user}
                      image={recipe.imageUrl}
                      title={recipe.title}
                      id={recipe.id}
                    />
                  ))
                ) : (
                  <h3>No recipes</h3>
                )}
              </div>
              <Link to="/my-recipes" className="self-end">
                <Button primary>Check out more</Button>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <h2 className="text-2xl font-semibold text-gray-700">
                Most liked
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {mostLiked.length > 0 ? (
                  mostLiked.map((recipe) => (
                    <Card
                      key={recipe.id}
                      user={recipe.user}
                      image={recipe.imageUrl}
                      title={recipe.title}
                      id={recipe.id}
                    />
                  ))
                ) : (
                  <h3>No recipes</h3>
                )}
              </div>
              <Link to="/recipes?most-liked" className="self-end">
                <Button primary>Check out more</Button>
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
