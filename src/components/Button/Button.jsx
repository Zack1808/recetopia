// Importing the style file
import "./Button.css";

// Creating the button component
const Button = ({ children, secondary, className = "", ...rest }) => {
  return (
    <button
      className={`${className} ${secondary ? "secondary" : ""}`}
      {...rest}
    >
      {children}
    </button>
  );
};

// Exporting the component
export default Button;
