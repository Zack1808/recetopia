import React, { useRef, useState } from "react";
import { toast, ToastOptions } from "react-toastify";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

import Input from "./Input";
import Button from "./Button";

import { useAppDispatch } from "../hooks/storeHook";
import { registration } from "../slices/authSlice";
import { auth, db } from "../firebaseConfig";
import { checkIfUserNameIsUsed } from "../helpers/registration";

import { RegistrationErrorState } from "../interfaces/states";

const RegisterForm: React.FC = () => {
  const [errors, setErrors] = useState<RegistrationErrorState>({
    errorEmail: false,
    errorPassword: false,
    errorUserName: false,
  });

  const dispatch = useAppDispatch();

  const formRef = useRef<HTMLFormElement>(null);

  const toastOptions: ToastOptions = {
    position: "top-right",
    hideProgressBar: false,
    closeOnClick: true,
  };

  const registerUser = async (
    email: string,
    password: string,
    displayName: string
  ) => {
    try {
      const userNameInUse = await checkIfUserNameIsUsed(displayName);
      if (userNameInUse) {
        toast.error("Username already in use");
        setErrors((prevState) => {
          return { ...prevState, errorUserName: true };
        });
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
      if (err.message === "Firebase: Error (auth/email-already-in-use).") {
        toast.error("Email already in use", toastOptions);
        setErrors((prevState) => ({ ...prevState, errorEmail: true }));
      } else {
        toast.error(err.message, toastOptions);
      }
    }
  };

  const handleFormSubmition = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    registerUser(
      formRef?.current?.Email?.value,
      formRef?.current?.Password?.value,
      formRef?.current?.Username?.value
    );
  };

  return (
    <form
      className="flex flex-col items-end gap-5"
      ref={formRef}
      onSubmit={handleFormSubmition}
    >
      <Input
        className={
          errors.errorUserName ? "border-red-500 ring-1 ring-red-500" : ""
        }
        title="Username"
        type="text"
        placeholder="CookMaster"
        required
        name="username"
        onChange={() =>
          setErrors((prevState) => ({ ...prevState, errorUserName: false }))
        }
      />
      <Input
        className={
          errors.errorEmail ? "border-red-500 ring-1 ring-red-500" : ""
        }
        title="Email"
        type="email"
        placeholder="cookmaster@gmail.com"
        required
        name="email"
        onChange={() =>
          setErrors((prevState) => ({ ...prevState, errorEmail: false }))
        }
      />
      <Input
        className={
          errors.errorPassword ? "border-red-500 ring-1 ring-red-500" : ""
        }
        title="Password"
        type="password"
        placeholder="password"
        required
        name="password"
        onChange={() =>
          setErrors((prevState) => ({ ...prevState, errorPassword: false }))
        }
      />
      <Button primary>Register</Button>
    </form>
  );
};

export default RegisterForm;
