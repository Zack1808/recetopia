import React, { useRef } from "react";

import Input from "./Input";
import Button from "./Button";

const RegisterForm: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const handleFormSubmition = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(
      formRef?.current?.Username?.value,
      formRef?.current?.Email?.value,
      formRef?.current?.Password?.value
    );
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
  };

  return (
    <form
      className="flex flex-col items-end gap-5"
      ref={formRef}
      onSubmit={handleFormSubmition}
    >
      <Input
        title="Username"
        type="text"
        placeholder="CookMaster"
        required
        name="username"
      />
      <Input
        title="Email"
        type="email"
        placeholder="cookmaster@gmail.com"
        required
        name="email"
      />
      <Input
        title="Password"
        type="password"
        placeholder="password"
        required
        name="password"
      />
      <Button primary>Register</Button>
    </form>
  );
};

export default RegisterForm;
