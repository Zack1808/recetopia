import { useState, useEffect } from "react";
import { getDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";

import { UseGetTagsProps } from "../interfaces/hooks";
import { SelectOptionsProps } from "../interfaces/components";

import { db } from "../firebaseConfig";

import { toastOptions } from "../toastOptions";

export const useGetMealTags = ({ setIsLoading }: UseGetTagsProps) => {
  const [allMealTags, setAllMealTags] = useState<SelectOptionsProps[]>([]);
  const [usedMealTags, setUsedMealTags] = useState<SelectOptionsProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getTags = async () => {
    try {
      const docSnap = await getDoc(doc(db, "tags", "XHFaU6oB3ZTVrAj7Qboq"));

      if (docSnap.exists()) {
        setAllMealTags(docSnap.data().allTags);
        setUsedMealTags(docSnap.data().usedTags);
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
