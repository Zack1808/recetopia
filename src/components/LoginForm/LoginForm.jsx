// Importing the costume components
import Form from "../Form/Form";
import Input from "../Input/Input";
import Button from "../Button/Button";

// Creating the LoginForm component
const LoginForm = () => {
  return (
    <div className="login-form">
      <h2>Login</h2>
      <Form>
        <label htmlFor="email">Email</label>
        <Input type="email" name="email" id="email" />
        <label htmlFor="password">Password</label>
        <Input type="password" name="password" id="password" />
        <Button>Login</Button>
      </Form>
    </div>
  );
};

// Exporting the component
export default LoginForm;
