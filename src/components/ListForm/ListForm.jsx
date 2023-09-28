import { forwardRef } from "react";
import { FaTimes } from "react-icons/fa";

// Importing the costume components
import Input from "../Input/Input";
import Button from "../Button/Button";

// Importing the style file
import "./ListForm.css";

// Creating the ListForm component
const ListForm = forwardRef(({ items = [], onSubmit, name, remove }, ref) => {
  return (
    <div className="list-form">
      <div className="form-info">
        <div className="list-input">
          <label htmlFor={name}>Add a new {name}</label>
          <Input
            placeholder={`Enter a ${name}`}
            type="text"
            name={name}
            id={name}
            ref={ref}
          />
        </div>
        <Button type="button" onClick={onSubmit}>
          Add
        </Button>
      </div>
      <div className="form-data">
        <h4>{name}s</h4>
        <ul>
          {items.length === 0 ? (
            <p>No {name}s available</p>
          ) : (
            items.map((item) => {
              return (
                <li key={item}>
                  {"- " + item}
                  <span className="close" onClick={() => remove(item)}>
                    <FaTimes />
                  </span>
                </li>
              );
            })
          )}
        </ul>
      </div>
    </div>
  );
});

// Exporting the component
export default ListForm;
