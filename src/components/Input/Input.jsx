import { forwardRef } from "react";

// Creating the Input component
const Input = forwardRef(
  (ref, { defaultValue = "", type = "text", ...rest }) => {
    return (
      <div className="input">
        <input type={type} defaultValue={defaultValue} ref={ref} {...rest} />
      </div>
    );
  }
);

// Exporting the component
export default Input;
