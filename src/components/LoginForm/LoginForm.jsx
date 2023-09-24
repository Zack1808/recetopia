import { useRef } from "react";

// Importing the costume components
import Form from "../Form/Form";
import Input from "../Input/Input";
import Button from "../Button/Button";

// Importing the helper functions
import { handleLogin } from "../../helpers/login";

// Importing the style file
import "./LoginForm.css";

// Creating the LoginForm component
const LoginForm = () => {
  // Setting up the ref
  const loginRef = useRef();

  return (
    <div className="login-form">
      <h2>Login</h2>
      <Form onSubmit={() => handleLogin(loginRef.current)} ref={loginRef}>
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
