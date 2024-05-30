import React, { useState, useRef } from "react";
import { ClipLoader } from "react-spinners";

import Input from "./Input";
import Button from "./Button";

import { useAppDispatch } from "../hooks/storeHook";
import { useLoginUser } from "../hooks/registrationHooks";

import { LoginErrorState } from "../interfaces/states";

const LoginForm: React.FC = () => {
  const [errors, setErrors] = useState<LoginErrorState>({
    errorUserName: false,
    errorPassword: false,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const formRef = useRef<HTMLFormElement>(null);

  const dispatch = useAppDispatch();

  const { loginUser } = useLoginUser({ setIsLoading, setErrors, dispatch });

  const handleFormSubmition = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    loginUser(
      formRef?.current?.Username?.value,
      formRef?.current?.Password?.value
    );
  };

  return (
    <form
      className="flex flex-col gap-5 items-end"
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

      <Button
        className="text-orange-500 self-start w-full sm:w-auto justify-center"
        type="button"
      >
        Forgot Password
      </Button>

      <Button
        primary
        disabled={isLoading}
        className="w-full sm:w-auto justify-center"
      >
        {isLoading ? <ClipLoader color="white" size={23} /> : "Login"}
      </Button>
    </form>
  );
};

export default LoginForm;
