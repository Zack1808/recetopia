import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";

// Importing the costume components
import LoginForm from "../../components/LoginForm/LoginForm";
import SignupForm from "../../components/SignupForm/SignupForm";

// Importing the context hook
import { useNavigate } from "../../context/navigation";

// Importing the style file
import "./LoginPage.css";

// Creating the LoginPage componnet
const LoginPage = () => {
  // Setting up the state
  const [tabNumber, setTabNumber] = useState(0); // State that will contain the information which tab is active

  // Getting the navigate function
  const { navigate } = useNavigate();

  // Getting the information if the user is logged in or not
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  // Rerouting the user to the dashboard if he is already logged in
  useEffect(() => {
    isLoggedIn || (!!Cookies.get("persistentLogin") && navigate("/dashboard"));

    // eslint-disable-next-line
  }, []);

  // Function that switches the tabs
  const handleSwitch = (tabNum) => {
    setTabNumber(tabNum);
  };

  return (
    <div className="login-page">
      <div className="container">
        <div className="forms">
          {/* Form Header start */}
          <div className="form-tabs">
            <h3
              className={tabNumber === 0 ? "active" : ""}
              onClick={() => handleSwitch(0)}
            >
              Login
            </h3>
            <h3
              className={tabNumber === 1 ? "active" : ""}
              onClick={() => handleSwitch(1)}
            >
              Sign Up
            </h3>
          </div>
          {/* Form header end */}

          {/* Form display start */}
          <div className="form-displayer">
            {tabNumber === 0 ? <LoginForm /> : <SignupForm />}
          </div>
          {/* Form display end */}
        </div>
      </div>
    </div>
  );
};

// Exporting the component
export default LoginPage;
