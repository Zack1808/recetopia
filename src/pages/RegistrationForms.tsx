import React, { useState } from "react";

import Button from "../components/Button";
import RegisterForm from "../components/RegisterForm";
import LoginForm from "../components/LoginForm";

const RegistrationForms: React.FC = () => {
  const [isRegisterForm, setIsRegisterForm] = useState<boolean>(true);

  return (
    <div
      className="flex flex-col gap-5
    "
    >
      <div className="bg-gradient-to-b from-gray-100 from-50% to-white to-50% flex rounted-t-lg">
        <Button
          onClick={() => setIsRegisterForm(true)}
          className={`flex-1 text-xl rounded-br-3xl justify-center py-3 transition font-semibold ${
            isRegisterForm
              ? "bg-white rounded-tr-3xl text-orange-400"
              : "text-gray-500 bg-gray-100"
          }`}
        >
          Register
        </Button>
        <Button
          onClick={() => setIsRegisterForm(false)}
          className={`flex-1 text-xl rounded-bl-3xl justify-center py-3 transition font-semibold ${
            !isRegisterForm
              ? "bg-white rounded-tl-3xl text-orange-400"
              : "text-gray-500 bg-gray-100"
          }`}
        >
          Login
        </Button>
      </div>
      {isRegisterForm ? <RegisterForm /> : <LoginForm />}
    </div>
  );
};

export default RegistrationForms;
