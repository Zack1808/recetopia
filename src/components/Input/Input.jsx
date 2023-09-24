import { forwardRef, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

// Importing the style file
import "./Input.css";

// Creating the Input component
const Input = forwardRef(
  ({ defaultValue = "", type = "text", ...rest }, ref) => {
    // Setting up the state
    const [inputType, setInputType] = useState(type); // State used for switching the input elemen from type password to type text

    // Function that will toogle the password visibility
    const tooglePwdVisibility = (type) => {
      setInputType(type);
    };

    return (
      <div className="input">
        {/* Display input start */}
        <input
          type={inputType}
          defaultValue={defaultValue}
          ref={ref}
          {...rest}
          autoComplete="on"
        />
        {/* Display input end */}

        {/* Adding show/hide passowrd button start */}
        {type === "password" &&
          (inputType === "password" ? (
            <span onClick={() => tooglePwdVisibility("text")}>
              <AiFillEye />
            </span>
          ) : (
            <span onClick={() => tooglePwdVisibility("password")}>
              <AiFillEyeInvisible />
            </span>
          ))}
        {/* Adding show/hide passowrd button end */}
      </div>
    );
  }
);

// Exporting the component
export default Input;
