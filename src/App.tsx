import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { auth } from "./firebaseConfig";

import Home from "./pages/Home";

const App: React.FC = () => {
  // useEffect(() => {
  //   console.log(auth);
  // }, [auth]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
