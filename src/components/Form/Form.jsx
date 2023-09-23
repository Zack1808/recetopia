// Creating the Form component
const Form = ({ children, onSubmit }) => {
  // Funciton that will handle the form submition
  const handleSubmit = (e) => {
    e.preventDefault();

    // Will run the forwarded submition funciton if forwarded

    onSubmit && onSubmit();
  };

  return <form onSubmit={handleSubmit}>{children}</form>;
};

// Exporting the component
export default Form;
