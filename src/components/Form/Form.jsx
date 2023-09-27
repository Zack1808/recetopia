import { forwardRef } from "react";

// Importing the style file
import "./Form.css";

// Creating the Form component
const Form = forwardRef(({ children, onSubmit, ...rest }, ref) => {
  // Funciton that will handle the form submition
  const handleSubmit = (e) => {
    // Prevents the default behaviour of the form
    e.preventDefault();

    // Will run the forwarded submition funciton if forwarded
    onSubmit && onSubmit();
  };

  return (
    <form ref={ref} onSubmit={handleSubmit} {...rest}>
      {children}
    </form>
  );
});

// Exporting the component
export default Form;
