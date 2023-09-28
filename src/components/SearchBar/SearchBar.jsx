import { forwardRef } from "react";
import { FaSearch } from "react-icons/fa";

// Importing the costume components
import Form from "../Form/Form";
import Input from "../Input/Input";
import Button from "../Button/Button";

// Importing the style file
import "./SearchBar.css";

// Creating the SearchBar component
const SearchBar = forwardRef(({ onChange }, ref) => {
  // Funciton that will handle the change event in the input
  const handleChange = () => {
    onChange();
  };
  return (
    <Form className="search" ref={ref} onChange={handleChange}>
      <Input type="text" name="search" placeholder="Search..." />
      <Button>
        <FaSearch />
      </Button>
    </Form>
  );
});

// Exporting the component
export default SearchBar;
