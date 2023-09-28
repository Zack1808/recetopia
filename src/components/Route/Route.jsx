// Importing the context hook
import { useNavigate } from "../../context/navigation";

// Creating the Route component
const Route = ({ to, children }) => {
  // Getting the reference to the currentPath
  const { currentPath } = useNavigate();

  // Function that will render the components
  const renderComponents = () => {
    if (to.includes(":")) {
      const length = to.indexOf(":");
      return to.substring(0, length) === currentPath.substring(0, length);
    }
    return to === currentPath;
  };

  // Displaying the component only if the current path is equal to the path the component should be display on
  return renderComponents() && children;
};

// Exporting the component
export default Route;
