import { useRef, useState } from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

// Importing the costume components
import Form from "../Form/Form";
import Input from "../Input/Input";
import Button from "../Button/Button";
import Loader from "../Loader/Loader";

// Importing the context hook
import { useNavigate } from "../../context/navigation";

// Importing the api funcitons
import { signup, login } from "../../api/login";

// Importing the actions
import { loginDispatcher } from "../../actions/loginActions";

// Importing the helper functions
import {
  checkLetter,
  checkNumber,
  checkSpecialChar,
} from "../../helpers/pwdRequirements";

// Importing the style file
import "./SignupForm.css";

// Creating the SignupForm component
const SignupForm = () => {
  // Setting up the state
  // States for the password
  const [hasLowerCase, setHasLowerCase] = useState(false);
  const [hasUpperCase, setHasUpperCase] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasSpecialChar, setHasSpecialChar] = useState(false);
  const [hasEightChars, setHasEightChars] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // State for checking if the loader should be displayed or not

  // Getting the navigate function
  const { navigate } = useNavigate();

  // Setting up the dispatcher
  const dispatch = useDispatch();

  // Setting up the form Ref
  const signupRef = useRef();

  // Function that will check if the password matches all requirements have been met
  const handleChange = () => {
    const pwd = signupRef.current.password.value;
    setHasLowerCase(checkLetter(pwd, "lowerCase"));
    setHasUpperCase(checkLetter(pwd, "upperCase"));
    setHasNumber(checkNumber(pwd));
    setHasSpecialChar(checkSpecialChar(pwd));
    setHasEightChars(pwd.length >= 8);
  };

  // Funciton that will disable the button in case the requirements are not met
  const checkPwdRequirements = () => {
    return (
      !hasEightChars ||
      !hasLowerCase ||
      !hasUpperCase ||
      !hasNumber ||
      !hasSpecialChar
    );
  };

  // Function that will handle the sign up sequence
  const handleSignup = async () => {
    setIsLoading(true);
    try {
      // Signing up the user
      const data = await signup({
        name: signupRef.current.name.value,
        email: signupRef.current.email.value,
        password: signupRef.current.password.value,
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

      // Loging the user in
      const loginData = await login({
        email: signupRef.current.email.value,
        password: signupRef.current.password.value,
      });
      toast.success(loginData.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      dispatch(loginDispatcher(loginData.appUser));
      navigate("/dashboard");
    } catch (err) {
      setIsLoading(false);
      toast.error(err.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <div className="signup-form">
      <h2>Sign Up</h2>
      <Form ref={signupRef} onSubmit={handleSignup}>
        {/* Form elements start */}
        <label htmlFor="name">Name*</label>
        <Input
          type="text"
          name="name"
          id="name"
          required
          placeholder="John Doe"
        />
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
          onChange={handleChange}
          name="password"
          id="password"
          required
          placeholder="Password"
        />
        {/* Form elements end */}

        {/* Password requirements display start */}
        <div className="requirements">
          <small className={`${hasEightChars ? "active" : ""}`}>
            Password has at least 8 characters
            {hasEightChars && <AiFillCheckCircle />}
          </small>

          <small className={`${hasUpperCase ? "active" : ""}`}>
            Password has at least 1 capital letter
            {hasUpperCase && <AiFillCheckCircle />}
          </small>

          <small className={`${hasLowerCase ? "active" : ""}`}>
            Password has at least 1 lower case letter
            {hasLowerCase && <AiFillCheckCircle />}
          </small>

          <small className={`${hasNumber ? "active" : ""}`}>
            Password has at least 1 number {hasNumber && <AiFillCheckCircle />}
          </small>

          <small className={`${hasSpecialChar ? "active" : ""}`}>
            Password has at least 1 special character
            {hasSpecialChar && <AiFillCheckCircle />}
          </small>
        </div>
        {/* Password requirements display end */}

        {/* Submit button start */}
        <Button disabled={checkPwdRequirements() || isLoading}>
          {isLoading ? <Loader /> : "Sign Up"}
        </Button>
        {/* Submit button end */}
      </Form>
    </div>
  );
};

// Exporting the component
export default SignupForm;
