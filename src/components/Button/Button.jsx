// Creating the button component
const Button = ({ value = "text", ...rest }) => {
  return <button>{value}</button>;
};

// Exporting the component
export default Button;
