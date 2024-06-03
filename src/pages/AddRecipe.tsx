import React, { useRef, useState, useEffect } from "react";

import { auth } from "../firebaseConfig";

import { useGetMealTags } from "../hooks/data";

import { SelectOptionsProps } from "../interfaces/components";

import Input from "../components/Input";
import Button from "../components/Button";
import Select from "../components/Select";

const AddRecipe: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [option, setOption] = useState<SelectOptionsProps[]>([]);

  const { allMealTags } = useGetMealTags({ setIsLoading });

  const formRef = useRef<HTMLFormElement>(null);

  return (
    <div className="w-full max-w-screen-2xl pt-5 flex flex-col gap-10 mx-auto p-3">
      <h1 className="text-4xl font-bold text-gray-700 self-start">
        Share the recipe for your{" "}
        <span className="text-orange-400">delicious</span> meal
      </h1>
      <form ref={formRef} className="flex flex-col gap-5">
        <Input
          type="text"
          title="Recipe title"
          placeholder="Pasta with salmon"
          required
        />
        <Select
          title="Tags"
          name="tags"
          required
          multiple
          placeholder="Select..."
          options={allMealTags}
          value={option}
          onChange={(val) => setOption(val)}
        />
      </form>
    </div>
  );
};

export default AddRecipe;
