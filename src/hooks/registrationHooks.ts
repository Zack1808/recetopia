import { useCallback } from "react";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { toast } from "react-toastify";
import { setDoc, doc } from "firebase/firestore";

import { registration } from "../slices/authSlice";
import { auth, db } from "../firebaseConfig";
import { checkIfUserNameIsUsed } from "../helpers/registration";

import { UseRegisterUserProps } from "../interfaces/hooks";

import { toastOptions } from "../toastOptions";

export const useRegisterUser = ({
  setIsLoading,
  setErrors,
  dispatch,
}: UseRegisterUserProps) => {
  const registerUser = useCallback(
    async (email: string, password: string, displayName: string) => {
      setIsLoading(true);
      try {
        const userNameInUse = await checkIfUserNameIsUsed(displayName);
        if (userNameInUse) {
          toast.error("Username already in use");
          setErrors((prevState) => ({ ...prevState, errorUserName: true }));
          return;
        }

        const { user } = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        await updateProfile(user, { displayName });

        await setPersistence(auth, browserSessionPersistence);

        await setDoc(doc(db, "users", user.uid), { displayName });

        dispatch(
          registration({
            userName: displayName,
            email,
            uid: user.uid,
          })
        );

        toast.success("Registration was successful", toastOptions);

        document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
      } catch (err: any) {
        switch (err.message) {
          case "Firebase: Error (auth/email-already-in-use).":
            toast.error("Email already in use", toastOptions);
            setErrors((prevState) => ({ ...prevState, errorEmail: true }));
            break;
          default:
            toast.error(err.message, toastOptions);
            break;
        }
      } finally {
        setIsLoading(false);
      }
    },
    [setIsLoading, setErrors, dispatch]
  );

  return { registerUser };
};
