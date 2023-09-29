import { useEffect } from "react";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";

// Importing the context hook
import { useNavigate } from "../../context/navigation";

// Importing the style file
import "./EditPage.css";

// Creating the EditPage component
const EditPage = () => {
  // Getting data from the store
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  // Getting the navigate function
  const { navigate, currentPath } = useNavigate();

  // Rerouting the user if he is not logged in
  useEffect(() => {
    if (!isLoggedIn && !!!Cookies.get("persistentLogin")) navigate("/");
    else {
      const id = currentPath.substring(
        currentPath.lastIndexOf("/") + 1,
        currentPath.length
      );
    }
  }, []);

  return (
    <div className="edit-page">
      <div className="container">
        <h1>Title</h1>
      </div>
    </div>
  );
};

// exporting the component
export default EditPage;
