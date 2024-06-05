import { useState, useEffect, useCallback } from "react";
import {
  getDoc,
  doc,
  serverTimestamp,
  addDoc,
  collection,
  updateDoc,
  query,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore";
import { toast } from "react-toastify";

import {
  UseGetTagsProps,
  UseCreateRecipeProps,
  UseGetRecipesInfoProps,
} from "../interfaces/hooks";
import { SelectOptionsProps } from "../interfaces/components";

import { storeImage, returnUniqueList } from "../helpers/data";

import { db, auth } from "../firebaseConfig";

import { toastOptions } from "../toastOptions";

export const useGetMealTags = ({ setIsLoading }: UseGetTagsProps) => {
  const [allMealTags, setAllMealTags] = useState<SelectOptionsProps[]>([]);
  const [usedMealTags, setUsedMealTags] = useState<SelectOptionsProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getTags = async () => {
    try {
      const docSnap = await getDoc(doc(db, "tags", "XHFaU6oB3ZTVrAj7Qboq"));

      if (docSnap.exists()) {
        setAllMealTags(
          docSnap
            .data()
            .allTags.sort((a: SelectOptionsProps, b: SelectOptionsProps) =>
              a.value < b.value ? -1 : 1
            )
        );
        setUsedMealTags(
          docSnap
            .data()
            .usedTags.sort((a: SelectOptionsProps, b: SelectOptionsProps) =>
              a.value < b.value ? -1 : 1
            )
        );
      }
    } catch (err) {
      toast.error("Could not get the tags", toastOptions);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTags();
  }, []);

  useEffect(() => {
    setIsLoading(loading);
  }, [loading]);

  return { allMealTags, usedMealTags };
};

export const useCreateRecipe = ({
  setIsLoading,
  navigate,
}: UseCreateRecipeProps) => {
  const createRecipe = useCallback(
    async (
      title: string,
      tags: SelectOptionsProps[],
      time: SelectOptionsProps,
      peopleAmount: SelectOptionsProps,
      image: File,
      ingredients: string[],
      instructions: string[],
      usedMealTags: SelectOptionsProps[]
    ) => {
      setIsLoading(true);
      if (!!!auth.currentUser) return;
      try {
        const url = await storeImage(image);

        const recipe = {
          title,
          tags,
          time,
          forHowManyPeople: peopleAmount,
          createdOn: serverTimestamp(),
          imageUrl: url,
          ingredients,
          instructions,
          createdBy: {
            uid: auth.currentUser.uid,
            displayName: auth.currentUser.displayName,
          },
          likes: {
            likeCount: 0,
            likedBy: [],
          },
          comments: [],
        };

        const allUsedTagsList = [...usedMealTags, ...tags, time, peopleAmount];

        const usedTags = returnUniqueList(allUsedTagsList, "value");

        const docRef = await addDoc(collection(db, "recipes"), recipe);

        await updateDoc(doc(db, "tags", "XHFaU6oB3ZTVrAj7Qboq"), {
          usedTags,
        });

        toast.success("Recipe created successfully", toastOptions);
        navigate(`recipes/${docRef.id}`);
      } catch (err) {
        console.log(err);
        toast.error("Could not create the recipe", toastOptions);
      } finally {
        setIsLoading(false);
      }
    },
    [setIsLoading, navigate]
  );

  return { createRecipe };
};

export const useGetRecipesInfo = ({ setIsLoading }: UseGetRecipesInfoProps) => {
  const getRecipesInfo = useCallback(
    async (amount = 10, sortBy = "createdOn") => {
      setIsLoading(true);
      try {
        let recipeQuery = query(
          collection(db, "recipes"),
          orderBy(sortBy, "desc"),
          limit(amount)
        );

        const querySnapshot = await getDocs(recipeQuery);

        const fetchedRecipeInfo = querySnapshot.docs.map((doc) => {
          const { title, imageUrl, createdBy } = doc.data();
          return {
            id: doc.id,
            title,
            imageUrl,
            user: createdBy.displayName,
          };
        });

        setIsLoading(false);

        return fetchedRecipeInfo;
      } catch (err) {
        toast.error("Could not fetch the recipes", toastOptions);
        setIsLoading(false);
      }
    },
    [setIsLoading]
  );

  return { getRecipesInfo };
};
