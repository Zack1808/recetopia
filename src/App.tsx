import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import PasswordReset from "./pages/PasswordReset";
import AddRecipe from "./pages/AddRecipe";

import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="pt-24 px-3 flex justify-center">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reset-password" element={<PasswordReset />} />
          <Route path="/add-recipe" element={<PrivateRoute />}>
            <Route path="/add-recipe" element={<AddRecipe />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
