import React, { useRef, useState } from "react";
import { ClipLoader } from "react-spinners";

import Input from "./Input";
import Button from "./Button";

import { useAppDispatch } from "../hooks/storeHook";
import { useRegisterUser } from "../hooks/registrationHooks";

import { RegistrationErrorState } from "../interfaces/states";

const RegisterForm: React.FC = () => {
  const [errors, setErrors] = useState<RegistrationErrorState>({
    errorEmail: false,
    errorPassword: false,
    errorUserName: false,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const formRef = useRef<HTMLFormElement>(null);

  const { registerUser } = useRegisterUser({
    setIsLoading,
    setErrors,
    dispatch,
  });

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
      <Button primary disabled={isLoading}>
        {isLoading ? <ClipLoader color="white" size={23} /> : "Register"}
      </Button>
    </form>
  );
};

export default RegisterForm;
