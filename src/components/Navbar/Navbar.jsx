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
        <div className="logo">
          <img src={logo} alt="logo" />
          <h1>Recetopia</h1>
        </div>
        {/* Logo end */}

        {/* Links start */}
        <div className="navigation">{/* Insert Links here */}</div>
        {/* Links end */}
      </div>
    </div>
  );
};

// Exporting the component
export default Navbar;
