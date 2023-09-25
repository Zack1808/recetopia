// Importing the costume components
import Navbar from "./components/Navbar/Navbar";
import Route from "./components/Route/Route";
import LoginPage from "./pages/LoginPage/LoginPage";

// Creating the App component
const App = () => {
  return (
    <div className="app">
      <Navbar />
      <Route to="/">
        <LoginPage />
      </Route>
    </div>
  );
};

// Exporting the component
export default App;
