import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "./firebaseConfig";
import { useAppDispatch } from "./hooks/storeHook";
import { registration } from "./slices/authSlice";

import Home from "./pages/Home";
import PasswordReset from "./pages/PasswordReset";
import Navbar from "./components/Navbar";

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const dispatch = useAppDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!!user)
        dispatch(
          registration({
            userName: user.displayName,
            email: user.email,
            uid: user.uid,
          })
        );
      setIsLoading(false);
    });
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      {isLoading ? (
        <div className="flex justify-center border absolute top-0 left-0 right-0 bottom-0 items-center">
          <ClipLoader color="rgb(251 146 60)" size={100} />
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reset-password" element={<PasswordReset />} />
        </Routes>
      )}
    </BrowserRouter>
  );
};

export default App;
