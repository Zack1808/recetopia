// Importig the costume components
import Loader from "../../components/Loader/Loader";

// importing the style file
import "./Logout.css";

// Creating the Logout component
const Logout = () => {
  return (
    <div className="logout">
      <div className="load">
        <Loader dark />
      </div>
    </div>
  );
};

// Exporting the component
export default Logout;
