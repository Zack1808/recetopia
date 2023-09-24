import React from "react";
import ReactDOM from "react-dom/client";
import { createStore } from "redux";
import { Provider } from "react-redux";

// Importing the root reducer
import { rootReducer } from "./reducers";

// Importing the context provider
import NavigationProvider from "./context/navigation";

// Importing the style file
import "./index.css";

// Importing the App component
import App from "./App";

// Creating the root element
const root = ReactDOM.createRoot(document.getElementById("root"));

// Creating the store
const store = createStore(rootReducer);

// Rendering the App component
root.render(
  <NavigationProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </NavigationProvider>
);
