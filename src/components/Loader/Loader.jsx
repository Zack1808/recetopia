// Importing the style file
import "./Loader.css";

// Creating the Loader component
const Loader = ({ dark }) => {
  return (
    <div className={`loader ${dark ? "dark" : ""}`}>
      <div className="dot" style={{ "--i": 1 }}></div>
      <div className="dot" style={{ "--i": 2 }}></div>
      <div className="dot" style={{ "--i": 3 }}></div>
      <div className="dot" style={{ "--i": 4 }}></div>
      <div className="dot" style={{ "--i": 5 }}></div>
      <div className="dot" style={{ "--i": 6 }}></div>
      <div className="dot" style={{ "--i": 7 }}></div>
      <div className="dot" style={{ "--i": 8 }}></div>
      <div className="dot" style={{ "--i": 9 }}></div>
      <div className="dot" style={{ "--i": 10 }}></div>
      <div className="dot" style={{ "--i": 11 }}></div>
      <div className="dot" style={{ "--i": 12 }}></div>
      <div className="dot" style={{ "--i": 13 }}></div>
      <div className="dot" style={{ "--i": 14 }}></div>
      <div className="dot" style={{ "--i": 15 }}></div>
      <div className="dot" style={{ "--i": 16 }}></div>
      <div className="dot" style={{ "--i": 17 }}></div>
      <div className="dot" style={{ "--i": 18 }}></div>
      <div className="dot" style={{ "--i": 19 }}></div>
      <div className="dot" style={{ "--i": 20 }}></div>
    </div>
  );
};

// Exporting the component
export default Loader;
