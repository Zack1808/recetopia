import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Importing the costume components
import Navbar from "./components/Navbar/Navbar";
import Route from "./components/Route/Route";
import LoginPage from "./pages/LoginPage/LoginPage";
import Dashboard from "./pages/Dashboard/Dashboard";

// Creating the App component
const App = () => {
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
    </div>
  );
};

// Exporting the component
export default App;
