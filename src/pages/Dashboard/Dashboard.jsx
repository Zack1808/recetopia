import { useEffect } from "react";
import { useSelector } from "react-redux";

// Importing the context hook
import { useNavigate } from "../../context/navigation";

// Importing the costume components
import SearchBar from "../../components/SearchBar/SearchBar";

// Importing the style file
import "./Dashboard.css";

// Creating the Dashboard component
const Dashboard = () => {
  // Getting the login status
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  // Getting the navigate function
  const { navigate } = useNavigate();

  // Rerouting the user to login if he is not logged in
  useEffect(() => {
    !isLoggedIn && navigate("/");

    // eslint-disable-next-line
  }, []);

  return (
    <div className="dashboard">
      <div className="container">
        <SearchBar />
      </div>
    </div>
  );
};

// Exporting the component
export default Dashboard;
