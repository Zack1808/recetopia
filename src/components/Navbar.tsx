import React, { useState } from "react";
import { Link } from "react-router-dom";

import Modal from "./Modal";
import RegistrationForms from "../pages/RegistrationForms";

import { useAppSelector } from "../hooks/storeHook";

import Logo from "../assets/Logo.svg";

const Navbar: React.FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const linkStyles: string = "text-white py-2 px-3 font-semibold text-md";

  const { isLoggedIn } = useAppSelector((state) => state.auth);

  const handleSignUpLinkPress = (
    event: React.MouseEvent<HTMLAnchorElement>
  ) => {
    event.preventDefault();
    setModalIsOpen(true);
  };

  return (
    <div className="bg-orange-400 p-3 flex justify-center">
      <div className="w-full max-w-screen-2xl flex justify-between">
        <Link to="/" className="flex items-center gap-3 font-pacifico">
          <img src={Logo} className="w-14" alt="Logo" />
          <h2 className="text-4xl text-white">Recetopia</h2>
        </Link>
        <div className="flex gap-2 items-center">
          <Link to="/" className={linkStyles}>
            Home
          </Link>
          {isLoggedIn ? null : (
            <Link
              to="/signup"
              onClick={handleSignUpLinkPress}
              className={linkStyles}
            >
              Signup
            </Link>
          )}
        </div>
      </div>
      <Modal isOpen={modalIsOpen} handleClose={() => setModalIsOpen(false)}>
        <RegistrationForms />
      </Modal>
    </div>
  );
};

export default Navbar;
