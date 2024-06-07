import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { doc, runTransaction } from "firebase/firestore";
import { toast } from "react-toastify";

import { auth, storage, db } from "../firebaseConfig";

import { SelectOptionsProps } from "../interfaces/components";

import { toastOptions } from "../toastOptions";

export const storeImage = async (image: File) => {
  const fileName = `${auth.currentUser && auth.currentUser.uid}-${
    image.name
  }-${uuidv4()}`;
  const storageRef = ref(storage, "images/" + fileName);

  await uploadBytesResumable(storageRef, image);

  const downloadUrl = getDownloadURL(storageRef);

  return downloadUrl;
};

export const returnUniqueList = (
  array: SelectOptionsProps[],
  key: keyof SelectOptionsProps
) => {
  const seen = new Map();
  return array.filter((item) => {
    const k = item[key];
    if (seen.has(k)) return false;
    seen.set(k, true);
    return true;
  });
};

export const updateLikeCount = async (uid: string, recipeId: string) => {
  const recipeRef = doc(db, "recipes", recipeId);
  try {
    await runTransaction(db, async (transaction) => {
      const recipeDoc = await transaction.get(recipeRef);

      if (!recipeDoc.exists()) throw new Error("recipe does not exist");

      const { likes } = recipeDoc.data();

      if (likes.likedBy.includes(uid)) {
        transaction.update(recipeRef, {
          "likes.likeCount": likes.likeCount - 1,
          "likes.likedBy": likes.likedBy.filter((id: string) => id !== uid),
        });
      } else {
        transaction.update(recipeRef, {
          "likes.likeCount": likes.likeCount + 1,
          "likes.likedBy": [...likes.likedBy, uid],
        });
      }
    });
  } catch (err) {
    toast.error("An error appeared", toastOptions);
  }
};
