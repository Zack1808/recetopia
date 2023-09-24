import { useRef } from "react";

// Importing the costume components
import Form from "../Form/Form";
import Input from "../Input/Input";
import Button from "../Button/Button";

// Importing the style file
import "./LoginForm.css";

// Creating the LoginForm component
const LoginForm = () => {
  // Setting up the ref
  const loginRef = useRef();

  // Creating the function that will handle the login
  const handleLogin = () => {};

  return (
    <div className="login-form">
      <h2>Login</h2>
      <Form onSubmit={handleLogin} ref={loginRef}>
        <label htmlFor="email">Email*</label>
        <Input type="email" name="email" id="email" required />
        <label htmlFor="password">Password*</label>
        <Input type="password" name="password" id="password" required />
        <Button>Login</Button>
      </Form>
    </div>
  );
};

// Exporting the component
export default LoginForm;
