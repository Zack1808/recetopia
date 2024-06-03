import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

import { toastOptions } from "../toastOptions";

import { useAuthStatus } from "../hooks/registrationHooks";

const PrivateRoute: React.FC = () => {
  const { isLoggedIn, checkingStatus } = useAuthStatus();

  if (checkingStatus)
    return (
      <div className="absolute t-1/2 flex justify-center">
        <ClipLoader color="rgb(251 146 60)" size={100} />
      </div>
    );

  if (!isLoggedIn)
    toast.error(
      "You must be logged in/signed in to access this page",
      toastOptions
    );

  return isLoggedIn ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
