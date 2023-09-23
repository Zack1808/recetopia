import { forwardRef } from "react";

// Importing the style file
import "./Input.css";

// Creating the Input component
const Input = forwardRef(
  ({ defaultValue = "", type = "text", ...rest }, ref) => {
    return (
      <div className="input">
        <input
          type={type}
          defaultValue={defaultValue}
          ref={ref}
          {...rest}
          autoComplete="on"
        />
      </div>
    );
  }
);

// Exporting the component
export default Input;
