import React, { useState, useRef } from "react";
import { useLocation } from "react-router-dom";

import Input from "../components/Input";
import Button from "../components/Button";

const PasswordReset: React.FC = () => {
  const [errors, setErrors] = useState<boolean>(false);

  const formRef = useRef<HTMLFormElement>(null);

  const oobCode = new URLSearchParams(useLocation().search).get("oobCode");

  const handleFormSubmition = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(oobCode);
    console.log(formRef?.current?.resetPassword?.value);
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
        />
        <Button primary>Reset password</Button>
      </form>
    </div>
  );
};

export default PasswordReset;
