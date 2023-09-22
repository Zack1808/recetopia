import { createContext, useContext, useState, useEffect } from "react";

// Creating the context
const NavigationContext = createContext();

// Creating and exporting the hook for accessing the context
export const useNavigate = () => {
  return useContext(NavigationContext);
};

// Creating the context provider
const NavigationProvider = ({ children }) => {
  // Setting up the state
  const [currentPath, setCurrentPath] = useState(window.location.pathname); // state that will contain the current url

  // Setting up the event listener for mowing backwards or forwards in the app
  useEffect(() => {
    // Function that will get the current pathname
    const handler = () => setCurrentPath(window.location.pathname);

    // Adding the event listener
    window.addEventListener("popstate", handler);

    // Cleaning up the previous event listener on rerender
    return () => window.removeEventListener("popstate", handler);
  }, []);

  // Funciton that handles the programatic navigation
  const navigate = (to) => {
    window.history.pushState({}, "", to);
    setCurrentPath(to);
  };

  return (
    <NavigationContext.Provider value={{ currentPath, navigate }}>
      {children}
    </NavigationContext.Provider>
  );
};

// Exporting the context provider
export default NavigationProvider;
