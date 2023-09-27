import { FaSearch } from "react-icons/fa";

// Importing the costume components
import Form from "../Form/Form";
import Input from "../Input/Input";
import Button from "../Button/Button";

// Importing the style file
import "./SearchBar.css";

// Creating the SearchBar component
const SearchBar = ({ onChange }) => {
  // Funciton that will handle the change event in the input
  const handleChange = (e) => {
    onChange(e.target.value);
  };
  return (
    <Form className="search">
      <Input onChange={handleChange} type="text" placeholder="Search..." />
      <Button>
        <FaSearch />
      </Button>
    </Form>
  );
};

// Exporting the component
export default SearchBar;
