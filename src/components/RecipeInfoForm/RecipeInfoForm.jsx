// Importing the costume components
import Form from "../Form/Form";
import Button from "../Button/Button";
import Input from "../Input/Input";

// Creating the RecipeInfoForm
const RecipeInfoForm = ({ item = null }) => {
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
    </Form>
  );
};

// Exporting the component
export default RecipeInfoForm;
