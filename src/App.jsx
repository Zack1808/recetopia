import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";

// Importing the fetching functions
import { fetchUser } from "./api/user";

// Importing the actions
import { loginDispatcher } from "./actions/loginActions";

// Importing the costume components
import Navbar from "./components/Navbar/Navbar";
import Route from "./components/Route/Route";
import LoginPage from "./pages/LoginPage/LoginPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import EditPage from "./pages/EditPage/EditPage";

// Creating the App component
const App = () => {
  // Setting up the dispatch function
  const dispatch = useDispatch();

  // Checking if the user was logged in before the current render, and if so, loggin the user back in
  useEffect(() => {
    const cookie = Cookies.get("persistentLogin");
    !!cookie && getUser(JSON.parse(cookie));

    // eslint-disable-next-line
  }, []);

  // Function that will fetch the user data in case he was logged in, but a refresh happened
  const getUser = async (id) => {
    const data = await fetchUser(id);
    dispatch(loginDispatcher(data.appUser));
  };

  return (
    <div className="app">
      <Navbar />
      <ToastContainer style={{ marginTop: "4em" }} />
      <Route to="/">
        <LoginPage />
      </Route>
      <Route to="/dashboard">
        <Dashboard />
      </Route>
      <Route to="/my-recipes">
        <Dashboard />
      </Route>
      <Route to="/recipe/:id">
        <EditPage />
      </Route>
    </div>
  );
};

// Exporting the component
export default App;
