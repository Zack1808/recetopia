import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

import { auth, storage } from "../firebaseConfig";

import { SelectOptionsProps } from "../interfaces/components";

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
