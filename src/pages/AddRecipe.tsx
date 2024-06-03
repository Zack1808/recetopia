import React, { useRef, useState } from "react";

import { auth } from "../firebaseConfig";

import Input from "../components/Input";
import Button from "../components/Button";

const AddRecipe: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const formRef = useRef<HTMLFormElement>(null);

  return (
    <div className="w-full max-w-screen-2xl pt-5 flex flex-col gap-10 mx-auto">
      <h1 className="text-4xl font-bold text-gray-700 self-start">
        Share the recipe for your{" "}
        <span className="text-orange-400">delicious</span> meal
      </h1>
      <form ref={formRef} className="flex flex-col gap-2">
        <Input
          type="text"
          title="Recipe title"
          placeholder="Pasta with salmon"
          required
        />
      </form>
    </div>
  );
};

export default AddRecipe;
