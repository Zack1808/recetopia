import { getDocs, where, query, collection } from "firebase/firestore";

import { db } from "../firebaseConfig";

export const checkIfUserNameIsUsed = async (displayName: string) => {
  const usersCollection = collection(db, "users");
  const userQuery = query(
    usersCollection,
    where("displayName", "==", displayName)
  );
  try {
    const userQuerySnapshot = await getDocs(userQuery);

    return !userQuerySnapshot.empty;
  } catch (err) {
    console.log(err);
  }
};
