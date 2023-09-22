// Importing the style file
import "./Hamburger.css";

// Creating the Hamburger component
const Hamburger = ({ toggle, onClick }) => {
  return (
    <div className="hamburger-container" onClick={onClick}>
      <div className={`hamburger ${toggle ? "active" : ""}`} />
    </div>
  );
};

// Exporting the component
export default Hamburger;
