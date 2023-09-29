import { useEffect } from "react";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

// Importing the actions
import { logoutDispatcher } from "../../actions/loginActions";

// Importing the context hook
import { useNavigate } from "../../context/navigation";

// Importig the costume components
import Loader from "../../components/Loader/Loader";

// importing the style file
import "./Logout.css";

// Creating the Logout component
const Logout = () => {
  // Getting the disptacher
  const dispatch = useDispatch();

  // Getting the navigate function
  const { navigate } = useNavigate();

  // Logging the user out onmound
  useEffect(() => {
    Cookies.remove("persistentLogin");
    dispatch(logoutDispatcher());
    navigate("/");
    toast.success("User successfuly logged out", {
      position: "top-center",
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    // eslint-disable-next-line
  }, []);

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
