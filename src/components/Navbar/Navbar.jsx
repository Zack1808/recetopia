import { useState } from "react";

// Importing costume components
import Link from "../Link/Link";
import Hamburger from "../Hamburger/Hamburger";

// Importing the style file
import "./Navbar.css";

// Importing the images
import logo from "../../images/recetopia_logo.png";

// Creating the Navbar component
const Navbar = () => {
  // Setting up state
  const [toggleNav, setToggleNav] = useState(false); // Will contain information if the navigation is open or closed (for small screens)

  // Function that will open/close the navigation
  const handleToggle = () => setToggleNav((prevState) => !prevState);

  // Funciton that will close the dropdown navigation (for the links)
  const handleClosure = () => setToggleNav(false);

  return (
    <div className="navbar">
      <div className="container">
        {/* Hamburger start */}
        <Hamburger toggle={toggleNav} onClick={handleToggle} />
        {/* Hamburger end */}

        {/* Logo start */}
        <Link to="/" className="logo" onClick={handleClosure}>
          <img src={logo} alt="logo" />
          <h1>Recetopia</h1>
        </Link>
        {/* Logo end */}

        {/* Links start */}
        <div className={`navigation ${toggleNav ? "active" : ""}`}>
          <Link to="/" onClick={handleClosure}>
            Recipes
          </Link>
          <>
            <Link to="/dashboard" onClick={handleClosure}>
              My recipes
            </Link>
            <Link to="/logout" onClick={handleClosure}>
              Logout
            </Link>
          </>
          <Link to="/login" onClick={handleClosure}>
            Login
          </Link>
        </div>
        {/* Links end */}
      </div>
    </div>
  );
};

// Exporting the component
export default Navbar;
