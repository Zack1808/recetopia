// Importing costume components
import Link from "../Link/Link";

// Importing the style file
import "./Navbar.css";

// Importing the images
import logo from "../../images/recetopia_logo.png";

// Creating the Navbar component
const Navbar = () => {
  return (
    <div className="navbar">
      <div className="container">
        {/* Logo start */}
        <Link to="/" className="logo">
          <img src={logo} alt="logo" />
          <h1>Recetopia</h1>
        </Link>
        {/* Logo end */}

        {/* Links start */}
        <div className="navigation">
          <Link to="/">Recipes</Link>
          <>
            <Link to="/dashboard">My recipes</Link>
            <Link to="/logout">Logout</Link>
          </>
          <Link to="/login">Login</Link>
        </div>
        {/* Links end */}
      </div>
    </div>
  );
};

// Exporting the component
export default Navbar;
