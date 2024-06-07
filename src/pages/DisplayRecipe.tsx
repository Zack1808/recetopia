import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { FaUtensils, FaClock, FaHeart, FaRegHeart } from "react-icons/fa6";

import Button from "../components/Button";
import Modal from "../components/Modal";
import CommentSection from "../components/CommentSection";

import { useGetRecipe } from "../hooks/data";
import { useAuthStatus } from "../hooks/registrationHooks";

import { updateLikeCount } from "../helpers/data";

import { toastOptions } from "../toastOptions";

import { auth } from "../firebaseConfig";

const DisplayRecipe: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [liked, setLiked] = useState<boolean>(false);
  const [isCommentSectionOpen, setIsCommentSectionOpen] =
    useState<boolean>(false);

  const { id } = useParams<{ id: string }>();

  const { isLoggedIn } = useAuthStatus();

  const navigate = useNavigate();

  if (!!!id) {
    toast.error("Invalid recipe id", toastOptions);
    navigate("/");
    return;
  }

  const { recipe } = useGetRecipe({ setIsLoading, uid: id });

  useEffect(() => {
    !!recipe &&
      !!auth.currentUser &&
      setLiked(recipe.likes.likedBy.includes(auth.currentUser?.uid));
  }, [recipe]);

  const handleLikeState = () => {
    setLiked((prevState) => !prevState);
    !!auth.currentUser && updateLikeCount(auth.currentUser.uid, id);
  };

  return isLoading ? (
    <div className="absolute top-1/2 left-0 flex w-full justify-center ">
      <ClipLoader color="rgb(251 146 60)" size={100} />
    </div>
  ) : !!recipe ? (
    <div className="*:box-border">
      <div className="w-full flex flex-col-reverse lg:flex-row border-b-2">
        <div className="flex flex-1 lg:justify-center lg:items-start relative p-3 flex-col gap-10">
          <div className="flex flex-col-reverse lg:flex-col gap-3 lg:absolute lg:left-1/4 lg:-right-10 z-10">
            <div>
              <h3 className="text-xl font-semibold text-gray-700">
                {recipe.createdBy.displayName}
              </h3>
              <small>
                {recipe.createdOn
                  .toDate()
                  .toLocaleDateString()
                  .replace(/\//g, ".")}
              </small>
            </div>
            <div className="flex flex-col gap-3">
              <h1 className="bg-orange-400 p-3 rounded font-bold text-white md:text-5xl text-3xl">
                {recipe.title}
              </h1>
              <div className="flex gap-4">
                <span className="flex gap-2 items-center">
                  <FaUtensils className="text-orange-400" />{" "}
                  {recipe.forHowManyPeople.label}
                </span>
                <span className="flex gap-2 items-center">
                  <FaClock className="text-orange-400" /> {recipe.time.label}
                </span>
                <span className="flex gap-2 items-center">
                  <FaHeart className="text-orange-400" />{" "}
                  {recipe.likes.likeCount}
                </span>
              </div>
            </div>
          </div>
          {isLoggedIn ? (
            <div className="flex-1 lg:ml-44 flex items-end gap-3">
              {auth?.currentUser?.uid === recipe.createdBy.uid ? (
                <>
                  <Button primary>Edit</Button>
                  <Button secondary>Delete</Button>
                </>
              ) : (
                <Button onClick={handleLikeState}>
                  {liked ? (
                    <FaHeart className="text-orange-400 text-2xl" />
                  ) : (
                    <FaRegHeart className="text-orange-400 text-2xl" />
                  )}
                </Button>
              )}
              <Button onClick={() => setIsCommentSectionOpen(true)}>
                Comments
              </Button>
            </div>
          ) : null}
        </div>
        <img
          src={recipe.imageUrl}
          alt={recipe.title}
          className="w-full lg:w-3/5"
        />
      </div>
      <div className="w-full mx-auto gap-20 flex flex-col mb-10 md:flex-row divide-x-2 divide-y-2 md:divide-y-0">
        <div className="lg:w-screen lg:pt-10 flex-1 lg:pl-40">
          <h2 className="text-3xl p-3 font-semibold text-orange-400">
            Ingredients
          </h2>
          <ol className=" p-3 flex flex-col gap-2 max-h-96 ">
            {recipe.ingredients.map((ingredient: string) => (
              <li key={ingredient}>{ingredient}</li>
            ))}
          </ol>
        </div>
        <div className=" lg:pt-10 w-full lg:w-3/5 lg:pr-32 lg:pl-5">
          <h2 className="text-3xl p-3 font-semibold text-orange-400">
            Instructions
          </h2>
          <ol className="p-3 flex flex-col gap-10 list-decimal list-inside">
            {recipe.instructions.map((instruction: string) => (
              <li
                className="font-semibold text-2xl text-orange-400"
                key={instruction}
              >
                <span className="font-medium text-base text-black">
                  {instruction}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
      <Modal
        title="Comments"
        isOpen={isCommentSectionOpen}
        handleClose={() => setIsCommentSectionOpen(false)}
      >
        <CommentSection comments={recipe.comments} uid={recipe.createdBy.uid} />
      </Modal>
    </div>
  ) : (
    <div className="absolute top-1/2 left-0 flex w-full justify-center ">
      <ClipLoader color="rgb(251 146 60)" size={100} />
    </div>
  );
};

export default DisplayRecipe;
