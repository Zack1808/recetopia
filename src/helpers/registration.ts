import { getDocs, where, query, collection } from "firebase/firestore";
import { toast } from "react-toastify";

import { db } from "../firebaseConfig";

import { PasswordValidityProps } from "../interfaces/helpers";

import { toastOptions } from "../toastOptions";

export const checkIfUserNameIsUsed = async (displayName: string) => {
  const usersCollection = collection(db, "users");
  const userQuery = query(
    usersCollection,
    where("displayName", "==", displayName)
  );
  try {
    const userQuerySnapshot = await getDocs(userQuery);

    const email = userQuerySnapshot.docs.map((doc) => doc.data().email);

    return {
      userNameInUse: !userQuerySnapshot.empty,
      email,
    };
  } catch (err) {
    console.log(err);
  }
};

export const checkPasswordValidity = ({
  password,
  setErrors,
}: PasswordValidityProps) => {
  const specialChars = /[!@#$%^&*(),.?":{}|<>]/;
  const lowerCase = /[a-z]/;
  const upperCase = /[A-Z]/;
  const numbers = /[0-9]/;

  if (password.length < 8) {
    setErrors((prevState) => ({ ...prevState, errorPassword: true }));
    toast.error("Password must have at least 8 characters", toastOptions);
    return false;
  }

  if (!lowerCase.test(password)) {
    setErrors((prevState) => ({ ...prevState, errorPassword: true }));
    toast.error(
      "Password must have at least 1 lowercase character",
      toastOptions
    );
    return false;
  }

  if (!upperCase.test(password)) {
    setErrors((prevState) => ({ ...prevState, errorPassword: true }));
    toast.error(
      "Password must have at least 1 uppercase character",
      toastOptions
    );
    return false;
  }

  if (!numbers.test(password)) {
    setErrors((prevState) => ({ ...prevState, errorPassword: true }));
    toast.error("Password must have at least 1 number", toastOptions);
    return false;
  }

  if (!specialChars.test(password)) {
    setErrors((prevState) => ({ ...prevState, errorPassword: true }));
    toast.error(
      "Password must have at least 1 special character",
      toastOptions
    );
    return false;
  }

  return true;
};
