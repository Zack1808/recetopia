// Importing the style file
import "./Card.css";

// Creating the Card component
const Card = ({ children }) => {
  return <div className="card">{children}</div>;
};

// Exporting the component
export default Card;
