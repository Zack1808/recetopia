import React from "react";
import ReactDOM from "react-dom/client";

// Importing the context provider
import NavigationProvider from "./context/navigation";

// Importing the style file
import "./index.css";

// Importing the App component
import App from "./App";

// Creating the root element
const root = ReactDOM.createRoot(document.getElementById("root"));

// Rendering the App component
root.render(
  <NavigationProvider>
    <App />
  </NavigationProvider>
);
