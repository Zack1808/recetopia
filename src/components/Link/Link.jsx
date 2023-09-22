// Importing the costume hooks
import { useNavigate } from "../../context/navigation";

// Creating the Link component
const Link = ({ children, to, onClick, ...rest }) => {
  // Getting the navigate function out of the context
  const { navigate } = useNavigate();

  // Function that will prevent the defualt behaviour of the anchor tag
  const handleClick = (e) => {
    // Will prevent default behavior only if the control key or command key is not pressed
    !e.ctrlKey && !e.metaKey && e.preventDefault();

    // Will handle the onClick funciton if one was passed down
    onClick && onClick();

    // Calling the funciton to programatically change the URL in the address bar
    navigate(to);
  };

  return (
    <a {...rest} onClick={handleClick} href={to}>
      {children}
    </a>
  );
};

// Exporting the component
export default Link;
