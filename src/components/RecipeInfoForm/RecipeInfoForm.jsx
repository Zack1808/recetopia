import { useState, useRef } from "react";

// Importing the costume components
import Form from "../Form/Form";
import Button from "../Button/Button";
import Input from "../Input/Input";
import ListForm from "../ListForm/ListForm";

// Importing the style file
import "./ReceptInfoForm.css";

// Creating the RecipeInfoForm
const RecipeInfoForm = ({ item = null }) => {
  // Setting up state
  const [steps, setSteps] = useState([]); // Will contain a list of steps for the recipe
  const [tags, setTags] = useState([]); // Will contain a list of tags the recipe should have

  // Setting up the refs
  const stepRef = useRef();
  const tagRef = useRef();

  // Function that will handle the submition for the recipe steps
  const handleStepSubmit = () => {
    let input = stepRef.current.value;
    // Adding new staps only if text has been entered in the input
    stepRef.current.value.split(" ").join("") !== "" &&
      setSteps((prevState) => [...prevState, input]);

    // Reseting the input
    stepRef.current.value = "";
  };

  // Function that will handle the submition for the recipe tags
  const handleTagSubmit = () => {
    let input = tagRef.current.value;
    // Adding new staps only if text has been entered in the input
    tagRef.current.value.split(" ").join("") !== "" &&
      setTags((prevState) => [...prevState, input]);

    // Reseting the input
    tagRef.current.value = "";
  };

  // Function that will remove the selected step
  const removeStep = (step) => {
    setSteps((prevState) => prevState.filter((st) => st !== step));
  };

  // Function that will remove the selected tag
  const removeTag = (tag) => {
    setTags((prevState) => prevState.filter((tg) => tg !== tag));
  };

  return (
    <Form>
      <label htmlFor="title">Title</label>
      <Input
        type="text"
        placeholder="Recipe title"
        required
        name="title"
        id="title"
        defaultValue={item && item.title}
      />
      <hr />
      <ListForm
        name="step"
        items={steps}
        onSubmit={handleStepSubmit}
        ref={stepRef}
        remove={removeStep}
      />
      <hr />
      <ListForm
        name="tag"
        items={tags}
        onSubmit={handleTagSubmit}
        ref={tagRef}
        remove={removeTag}
      />
      <Button>Create recipe</Button>
    </Form>
  );
};

// Exporting the component
export default RecipeInfoForm;
