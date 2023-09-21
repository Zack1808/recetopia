// Importing the style file
import "./Navbar.css";

// Importing the images
import logo from "../../images/recetopia_logo.png";

// Creating the Navbar component
const Navbar = () => {
  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <img src={logo} alt="" />
          <h1>Recetopia</h1>
        </div>
      </div>
    </div>
  );
};

// Exporting the component
export default Navbar;
