// Importing the context hook
import { useNavigate } from "../../context/navigation";

// Creating the Route component
const Route = ({ to, children }) => {
  // Getting the reference to the currentPath
  const { currentPath } = useNavigate();

  // Displaying the component only if the current path is equal to the path the component should be display on
  return to === currentPath && children;
};

// Exporting the component
export default Route;
