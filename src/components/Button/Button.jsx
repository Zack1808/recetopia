// Importing the style file
import "./Button.css";

// Creating the button component
const Button = ({ children, secondary, className = "", disabled, ...rest }) => {
  return (
    <button
      disabled={disabled}
      className={`${className} ${secondary ? "secondary" : ""} ${
        disabled ? "disabled" : ""
      }`}
      {...rest}
    >
      {children}
    </button>
  );
};

// Exporting the component
export default Button;
