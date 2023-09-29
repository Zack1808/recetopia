import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";

// Importing the api functions
import { login } from "../../api/login";

// Importing the actions
import { loginDispatcher } from "../../actions/loginActions";

// Importing the costume components
import Form from "../Form/Form";
import Input from "../Input/Input";
import Button from "../Button/Button";
import Loader from "../Loader/Loader";

// Importing the context hook
import { useNavigate } from "../../context/navigation";

// Importing the style file
import "./LoginForm.css";

// Creating the LoginForm component
const LoginForm = () => {
  // Setting up the state
  const [isLoading, setIsLoading] = useState(false);

  // Setting up the ref
  const loginRef = useRef();

  // Setting up the dispatch hook
  const dispatch = useDispatch();

  // Getting the navigate funciton
  const { navigate } = useNavigate();

  // Function that will handle the login sequence
  const handleLogin = async () => {
    // Setting the state to Loading
    setIsLoading(true);

    // Sending the login request to the server
    try {
      const data = await login({
        email: loginRef.current.email.value,
        password: loginRef.current.password.value,
      });
      toast.success(data.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      Cookies.set("persistentLogin", JSON.stringify(data.appUser.id), {
        expires: null,
      });
      dispatch(loginDispatcher(data.appUser));
      navigate("/dashboard");
    } catch (err) {
      setIsLoading(false);
      toast.error(
        err.response?.status === 401
          ? "Account does not exist or the password is wrong"
          : err.message,
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
    }
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      <Form onSubmit={handleLogin} ref={loginRef}>
        <label htmlFor="email">Email*</label>
        <Input
          type="email"
          name="email"
          id="email"
          required
          placeholder="johndoe@gmail.com"
        />
        <label htmlFor="password">Password*</label>
        <Input
          type="password"
          name="password"
          id="password"
          required
          placeholder="Password"
        />
        <Button disabled={isLoading}>
          {isLoading ? (
            <span>
              <Loader />
            </span>
          ) : (
            "Login"
          )}
        </Button>
      </Form>
    </div>
  );
};

// Exporting the component
export default LoginForm;
