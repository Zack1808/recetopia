import React, { useState } from "react";
import { ClipLoader } from "react-spinners";

import Input from "./Input";
import Button from "./Button";

const LoginForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <form className="flex flex-col gap-5 items-end">
      <Input
        type="text"
        placeholder="Cookmaster"
        title="Username"
        required
        name="username"
      />

      <Input
        type="password"
        placeholder="Password"
        title="Password"
        required
        name="password"
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
