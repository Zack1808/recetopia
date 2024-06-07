import { useState, useEffect, useRef } from "react";
import { useCallback } from "react";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  setPersistence,
  browserSessionPersistence,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  confirmPasswordReset,
  onAuthStateChanged,
} from "firebase/auth";
import { toast } from "react-toastify";
import { setDoc, doc } from "firebase/firestore";

import { auth, db } from "../firebaseConfig";

import {
  checkIfUserNameIsUsed,
  checkPasswordValidity,
  checkIfEmailDoesExist,
} from "../helpers/registration";

import {
  UseRegisterUserProps,
  UseLoginUserProps,
  useSendResetPasswordMailProps,
  useResetPasswordProps,
} from "../interfaces/hooks";

import { toastOptions } from "../toastOptions";

export const useRegisterUser = ({
  setIsLoading,
  setErrors,
}: UseRegisterUserProps) => {
  const registerUser = useCallback(
    async (email: string, password: string, displayName: string) => {
      setIsLoading(true);
      try {
        const userNameInUse = await checkIfUserNameIsUsed(displayName);
        if (userNameInUse?.userNameInUse) {
          toast.error("Username already in use");
          setErrors((prevState) => ({ ...prevState, errorUserName: true }));
          return;
        }

        if (!checkPasswordValidity({ password, setErrors })) return;

        const { user } = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        await updateProfile(user, { displayName });

        await setPersistence(auth, browserSessionPersistence);

        await setDoc(doc(db, "users", user.uid), {
          displayName,
          email,
          slug: displayName.toLowerCase(),
        });

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
    [setIsLoading, setErrors]
  );

  return { registerUser };
};

export const useLoginUser = ({
  setIsLoading,
  setErrors,
}: UseLoginUserProps) => {
  const loginUser = useCallback(
    async (displayName: string, password: string) => {
      setIsLoading(true);
      try {
        const userNameInUse = await checkIfUserNameIsUsed(displayName);
        if (!userNameInUse?.userNameInUse) {
          toast.error("Username not found");
          setErrors((prevState) => ({ ...prevState, errorUserName: true }));
          return;
        }

        await signInWithEmailAndPassword(
          auth,
          userNameInUse.email[0],
          password
        );

        await setPersistence(auth, browserSessionPersistence);

        toast.success("Login was successful", toastOptions);

        document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
      } catch (err) {
        toast.error("Invalid credentials", toastOptions);
        setErrors((prevState) => ({
          ...prevState,
          errorUserName: true,
          errorPassword: true,
        }));
      } finally {
        setIsLoading(false);
      }
    },
    [setIsLoading, setErrors]
  );

  return { loginUser };
};

export const useSendResetPasswordMail = ({
  setErrors,
  setIsLoading,
}: useSendResetPasswordMailProps) => {
  const sendResetPasswordMail = useCallback(
    async (email: string) => {
      setIsLoading(true);
      try {
        const emailIsUsed = await checkIfEmailDoesExist(email);
        if (!emailIsUsed) {
          toast.error("No user with this email available", toastOptions);
          setErrors((prevState) => ({ ...prevState, errorEmail: true }));
          return;
        }

        await sendPasswordResetEmail(auth, email);

        toast.success("Email sent successfuly", toastOptions);

        document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
      } catch (err) {
        toast.error("Could not send password reset mail", toastOptions);
      } finally {
        setIsLoading(false);
      }
    },
    [setErrors, setIsLoading]
  );

  return { sendResetPasswordMail };
};

export const useResetPassword = ({
  setIsLoading,
  setErrors,
  navigateTo,
}: useResetPasswordProps) => {
  const resetPassword = useCallback(
    async (password: string, oobCode: string | null) => {
      try {
        if (!checkPasswordValidity({ password })) {
          setErrors(true);
          return;
        }

        if (!!!oobCode) {
          toast.error("Invalid oobCode", toastOptions);
          return;
        }

        await confirmPasswordReset(auth, oobCode, password);

        toast.success(
          "Your password has been reseted. Try logging in agian",
          toastOptions
        );

        navigateTo("/");
      } catch (err: any) {
        toast.error(err);
      }
    },
    [setIsLoading, setErrors]
  );

  return { resetPassword };
};

export const useAuthStatus = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [checkingStatus, setCheckingStatuts] = useState<boolean>(true);

  const isMounted = useRef<boolean>(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      user && setIsLoggedIn(true);
      setCheckingStatuts(false);
    });
  }, [isMounted]);

  return { isLoggedIn, checkingStatus };
};
