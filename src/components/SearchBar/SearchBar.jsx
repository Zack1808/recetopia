import { AiOutlineSearch } from "react-icons/ai";

// Importing the costume components
import Form from "../Form/Form";
import Input from "../Input/Input";
import Button from "../Button/Button";

// Importing the style file
import "./SearchBar.css";

// Creating the SearchBar component
const SearchBar = ({ onSubmit }) => {
  return (
    <Form className="search">
      <Input type="text" placeholder="Search..." />
      <Button>
        <AiOutlineSearch />
      </Button>
    </Form>
  );
};

// Exporting the component
export default SearchBar;
