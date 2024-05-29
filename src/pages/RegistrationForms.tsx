import React, { useState } from "react";

import Button from "../components/Button";
import RegisterForm from "../components/RegisterForm";

const RegistrationForms: React.FC = () => {
  const [isRegisterForm, setIsRegisterForm] = useState<boolean>(true);

  return (
    <div
      className="flex flex-col gap-5
    "
    >
      <div className="bg-gray-100 flex rounted-t-lg">
        <Button
          onClick={() => setIsRegisterForm(true)}
          className={`flex-1 text-xl justify-center py-3 transition font-semibold ${
            isRegisterForm
              ? "bg-white rounded-tr-lg text-orange-400"
              : "text-gray-500"
          }`}
        >
          Register
        </Button>
        <Button
          onClick={() => setIsRegisterForm(false)}
          className={`flex-1 text-xl justify-center py-3 transition font-semibold ${
            !isRegisterForm
              ? "bg-white rounded-tl-xl text-orange-400"
              : "text-gray-500"
          }`}
        >
          Login
        </Button>
      </div>
      {isRegisterForm ? <RegisterForm /> : null}
    </div>
  );
};

export default RegistrationForms;
