import React, { useRef, useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

import { useGetMealTags } from "../hooks/data";

import { SelectOptionsProps } from "../interfaces/components";
import { AddRecipeErrorState } from "../interfaces/states";

import Input from "../components/Input";
import Button from "../components/Button";
import Select from "../components/Select";
import List from "../components/List";
import Textarea from "../components/Textarea";
import ImageUpload from "../components/ImageUpload";

import { toastOptions } from "../toastOptions";

const AddRecipe: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tags, setTags] = useState<SelectOptionsProps[]>([]);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [instructions, setInstructions] = useState<string[]>([]);
  const [time, setTime] = useState<SelectOptionsProps | undefined>();
  const [errors, setErrors] = useState<AddRecipeErrorState>({
    errorTags: false,
    errorTime: false,
    errorIngredient: false,
    errorInstructions: false,
  });

  const timeList = [
    {
      label: "< 30 minutes",
      value: "lessthan30minutes",
    },
    {
      label: "30 - 60 minutes",
      value: "30to60minutes",
    },
    {
      label: "60 - 90 minutes",
      value: "60to90minutes",
    },
    {
      label: "90 - 120 minutes",
      value: "90to120minutes",
    },
    {
      label: "> 120 minutes",
      value: "morethan120minutes",
    },
  ];

  const { allMealTags } = useGetMealTags({ setIsLoading });

  const formRef = useRef<HTMLFormElement>(null);
  const ingredientsRef = useRef<HTMLInputElement>(null);
  const instructionsRef = useRef<HTMLTextAreaElement>(null);

  const addIngredients = () => {
    if (!!!ingredientsRef.current) return;

    const ingredient = ingredientsRef.current.value;

    if (ingredient.replace(/\s/g, "") === "") return;

    console.log(ingredient);

    setIngredients((prevState) => [...prevState, ingredient]);

    ingredientsRef.current.value = "";
  };

  const addInstruction = () => {
    if (!!!instructionsRef.current) return;

    const instruction = instructionsRef.current.value;

    if (instruction.replace(/\s/g, "") === "") return;

    console.log(instruction);

    setInstructions((prevState) => [...prevState, instruction]);

    instructionsRef.current.value = "";
  };

  const removeItem = (index: number, itemType: string) => {
    if (itemType === "ingredients") {
      setIngredients((prevState) =>
        prevState.filter((_, ind) => ind !== index)
      );
      return;
    }
    setInstructions((prevState) => prevState.filter((_, ind) => ind !== index));
  };

  const handleSubmition = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!!!formRef.current) return;
    if (tags.length <= 0) {
      setErrors((prevState) => ({ ...prevState, errorTags: true }));
      toast.error("Must select at least one tag", toastOptions);
      return;
    }
    if (!!!time) {
      setErrors((prevState) => ({ ...prevState, errorTime: true }));
      toast.error("Must select time for preparation", toastOptions);
      return;
    }
    if (ingredients.length < 2) {
      setErrors((prevState) => ({ ...prevState, errorIngredient: true }));
      toast.error("Must add at least 2 ingredients", toastOptions);
      return;
    }
    if (instructions.length < 2) {
      setErrors((prevState) => ({ ...prevState, errorInstructions: true }));
      toast.error("Must add at least 1 block of instructions", toastOptions);
      return;
    }
  };

  useEffect(() => {
    if (ingredients.length >= 2)
      setErrors((prevState) => ({ ...prevState, errorIngredient: false }));
    if (instructions.length >= 1)
      setErrors((prevState) => ({ ...prevState, errorInstructions: false }));
  }, [ingredients, instructions]);

  return (
    <div className="w-full max-w-screen-2xl pt-5 flex flex-col gap-10 mx-auto p-3">
      <h1 className="text-4xl font-bold text-gray-700 self-start">
        Share the recipe for your{" "}
        <span className="text-orange-400">delicious</span> meal
      </h1>

      <form
        ref={formRef}
        className="flex flex-col gap-5 items-end"
        onSubmit={handleSubmition}
      >
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
          placeholder="Select multiple..."
          options={allMealTags}
          value={tags}
          onChange={(val) => {
            setTags(val);
            setErrors((prevState) => ({ ...prevState, errorTags: false }));
          }}
          className={
            errors.errorTags ? "border-red-500 ring-1 ring-red-500" : ""
          }
        />

        <Select
          title="Takes time"
          name="takesTime"
          required
          placeholder="Select..."
          options={timeList}
          value={time}
          onChange={(val) => {
            setTime(val);
            setErrors((prevState) => ({ ...prevState, errorTime: false }));
          }}
          className={
            errors.errorTime ? "border-red-500 ring-1 ring-red-500" : ""
          }
        />

        <ImageUpload title="Upload Image" required />

        <div className="flex flex-col w-full gap-5">
          <div className="w-full flex gap-2 md:items-end flex-col md:flex-row">
            <Input
              ref={ingredientsRef}
              name="ingredients"
              type="text"
              placeholder="4 potatoes"
              title="Ingredients"
              className={
                errors.errorIngredient
                  ? "border-red-500 ring-1 ring-red-500"
                  : ""
              }
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
              <List
                list={ingredients}
                removeItem={removeItem}
                itemType="ingredients"
              />
            ) : (
              <h3 className="text-md font-semibold text-gray-700">
                No ingredients added yet. This field requires at least two
                blocks of ingredients.
              </h3>
            )}
          </div>
        </div>

        <div className="flex flex-col w-full gap-5">
          <div className="w-full flex gap-2 md:items-end flex-col ">
            <Textarea
              title="Instructions"
              placeholder="Add eggs to the mixture..."
              ref={instructionsRef}
              className={
                errors.errorInstructions
                  ? "border-red-500 ring-1 ring-red-500"
                  : ""
              }
            />
            <Button
              type="button"
              primary
              className="md:justify-start justify-center flex-auto"
              onClick={addInstruction}
            >
              Add
            </Button>
          </div>

          <div>
            {instructions.length > 0 ? (
              <List
                list={instructions}
                removeItem={removeItem}
                itemType="instructions"
              />
            ) : (
              <h3 className="text-md font-semibold text-gray-700">
                No instructions added yet. This field requires at least one
                block of instructions.
              </h3>
            )}
          </div>
        </div>

        <Button primary>
          {isLoading ? <ClipLoader color="white" size={23} /> : "Create Recipe"}
        </Button>
      </form>
    </div>
  );
};

export default AddRecipe;
