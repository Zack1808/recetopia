import { useState, useRef } from "react";

// Importing the style file
import "./LoginPage.css";

// Creating the LoginPage componnet
const LoginPage = () => {
  // Setting up the state
  const [tabNumber, setTabNumber] = useState(0); // State that will contain the information which tab is active

  // Function that switches the tabs
  const handleSwitch = (tabNum) => {
    setTabNumber(tabNum);
  };

  return (
    <div className="login-page">
      <div className="container">
        <div className="forms">
          <div className="form-headers">
            <h2
              className={tabNumber === 0 ? "active" : ""}
              onClick={() => handleSwitch(0)}
            >
              Login
            </h2>
            <h2
              className={tabNumber === 1 ? "active" : ""}
              onClick={() => handleSwitch(1)}
            >
              Sign Up
            </h2>
          </div>
          <div className="form-body">
            {tabNumber === 0 ? <h2>Login</h2> : <h2>Sign Up</h2>}
          </div>
        </div>
      </div>
    </div>
  );
};

// Exporting the component
export default LoginPage;
