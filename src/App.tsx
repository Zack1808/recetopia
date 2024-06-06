import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import PasswordReset from "./pages/PasswordReset";
import AddRecipe from "./pages/AddRecipe";
import Favorite from "./pages/Favorite";

import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reset-password" element={<PasswordReset />} />
        <Route path="/add-recipe" element={<PrivateRoute />}>
          <Route path="/add-recipe" element={<AddRecipe />} />
        </Route>
        <Route path="/favorites" element={<PrivateRoute />}>
          <Route path="/favorites" element={<Favorite />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
