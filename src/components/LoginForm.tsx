import React, { useState, useRef } from "react";
import { ClipLoader } from "react-spinners";

import Input from "./Input";
import Button from "./Button";

import { useAppDispatch } from "../hooks/storeHook";
import { useLoginUser, useResetPassword } from "../hooks/registrationHooks";

import { LoginErrorState } from "../interfaces/states";

const LoginForm: React.FC = () => {
  const [errors, setErrors] = useState<LoginErrorState>({
    errorUserName: false,
    errorPassword: false,
    errorEmail: false,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasForgottenPwd, setHasForgotenPwd] = useState<boolean>(false);

  const formRef = useRef<HTMLFormElement>(null);

  const dispatch = useAppDispatch();

  const { loginUser } = useLoginUser({ setIsLoading, setErrors, dispatch });
  const { resetPassword } = useResetPassword({ setErrors, setIsLoading });

  const handleFormSubmition = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (hasForgottenPwd) {
      resetPassword(formRef?.current?.Email?.value);
    } else {
      loginUser(
        formRef?.current?.username?.value,
        formRef?.current?.password?.value
      );
    }
  };

  return (
    <form
      className="flex flex-col gap-5 items-end"
      ref={formRef}
      onSubmit={handleFormSubmition}
    >
      {hasForgottenPwd ? (
        <>
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
          <div className="w-full flex justify-between">
            <Button
              onClick={() => setHasForgotenPwd(false)}
              className="text-orange-500"
              type="button"
            >
              Login
            </Button>
            <Button primary>
              {isLoading ? (
                <ClipLoader color="white" size={23} />
              ) : (
                "Reset Password"
              )}
            </Button>
          </div>
        </>
      ) : (
        <>
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
            onClick={() => setHasForgotenPwd(true)}
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
        </>
      )}
    </form>
  );
};

export default LoginForm;
