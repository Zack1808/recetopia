import { useRef } from "react";

// Importing the costume components
import Form from "../Form/Form";
import Input from "../Input/Input";
import Button from "../Button/Button";

// Importing the style file
import "./SignupForm.css";

// Creating the SignupForm component
const SignupForm = () => {
  // Setting up the form Ref
  const signupRef = useRef();

  // Function that will handle the sign up
  const handleSignUp = () => {};

  return (
    <div className="signup-form">
      <h2>Sign Up</h2>
      <Form ref={signupRef} onSubmit={handleSignUp}>
        <label htmlFor="name">Name*</label>
        <Input type="text" name="name" id="name" required />
        <label htmlFor="email">Email*</label>
        <Input type="email" name="email" id="email" required />
        <label htmlFor="password">Password*</label>
        <Input type="password" name="password" id="password" required />
        <Button>Sign up</Button>
      </Form>
    </div>
  );
};

// Exporting the component
export default SignupForm;
