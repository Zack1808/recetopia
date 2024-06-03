import React, { useRef, useState } from "react";

import { useGetMealTags } from "../hooks/data";

import { SelectOptionsProps } from "../interfaces/components";

import Input from "../components/Input";
import Button from "../components/Button";
import Select from "../components/Select";
import List from "../components/List";
import { ClipLoader } from "react-spinners";

const AddRecipe: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [option, setOption] = useState<SelectOptionsProps[]>([]);
  const [ingredients, setIngredients] = useState<string[]>([]);

  const { allMealTags } = useGetMealTags({ setIsLoading });

  const formRef = useRef<HTMLFormElement>(null);
  const ingredientsRef = useRef<HTMLInputElement>(null);

  const addIngredients = () => {
    if (!!!ingredientsRef.current) return;

    const ingredient = ingredientsRef.current.value;

    if (ingredient.replace(/\s/g, "") === "") return;

    console.log(ingredient);

    setIngredients((prevState) => [...prevState, ingredient]);

    ingredientsRef.current.value = "";
  };

  const removeItem = (index: number) => {
    setIngredients((prevState) => prevState.filter((_, ind) => ind !== index));
  };

  return (
    <div className="w-full max-w-screen-2xl pt-5 flex flex-col gap-10 mx-auto p-3">
      <h1 className="text-4xl font-bold text-gray-700 self-start">
        Share the recipe for your{" "}
        <span className="text-orange-400">delicious</span> meal
      </h1>

      <form ref={formRef} className="flex flex-col gap-5 items-end">
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

        <div className="flex flex-col w-full gap-5">
          <div className="w-full flex gap-2 md:items-end flex-col md:flex-row">
            <Input
              ref={ingredientsRef}
              name="ingredients"
              type="text"
              placeholder="4 potatoes"
              title="Ingredients"
            />
            <Button
              type="button"
              primary
              className="md:justify-start justify-center flex-auto"
              onClick={addIngredients}
            >
              Add
            </Button>
          </div>

          <div>
            {ingredients.length > 0 ? (
              <List list={ingredients} removeItem={removeItem} />
            ) : (
              <h3 className="text-md font-semibold text-gray-700">
                No ingredients added yet.
              </h3>
            )}
          </div>
        </div>
        <Button primary>{isLoading ? <ClipLoader /> : "Create Recipe"}</Button>
      </form>
    </div>
  );
};

export default AddRecipe;
