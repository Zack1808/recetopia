import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

import Input from "../components/Input";
import Button from "../components/Button";

import { useResetPassword } from "../hooks/registrationHooks";

const PasswordReset: React.FC = () => {
  const [errors, setErrors] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const formRef = useRef<HTMLFormElement>(null);

  const navigateTo = useNavigate();

  const oobCode = new URLSearchParams(useLocation().search).get("oobCode");

  useEffect(() => {
    !!!oobCode && navigateTo("/");
  }, [oobCode]);

  const { resetPassword } = useResetPassword({
    setErrors,
    setIsLoading,
    navigateTo,
  });

  const handleFormSubmition = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    resetPassword(formRef?.current?.resetPassword?.value, oobCode);
  };

  return (
    <div className="fixed top-0 bottom-0 right-0 left-0 flex justify-center items-center p-3">
      <form
        ref={formRef}
        className="flex flex-col gap-5 items-end w-full max-w-2xl shadow-md shadow-slate-200 rounded py-5 px-3"
        onSubmit={handleFormSubmition}
      >
        <h2 className="text-3xl font-semibold self-start text-gray-700">
          Reset password
        </h2>
        <Input
          className={errors ? "border-red-500 ring-1 ring-red-500" : ""}
          type="password"
          title="Reset Password"
          required
          name="resetPassword"
          placeholder="new password"
          onChange={() => setErrors(false)}
        />
        <Button primary>
          {isLoading ? (
            <ClipLoader color="white" size={23} />
          ) : (
            "Reset password"
          )}
        </Button>
      </form>
    </div>
  );
};

export default PasswordReset;
