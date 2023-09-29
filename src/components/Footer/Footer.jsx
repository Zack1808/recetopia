import { FaRegCopyright } from "react-icons/fa";

// Importing the style file
import "./Footer.css";

// Creating the footer component
const Footer = () => {
  return (
    <div className="footer">
      <FaRegCopyright /> Recetopia (JPN) 2023 - {new Date().getFullYear()}
    </div>
  );
};

// Exporting the component
export default Footer;
