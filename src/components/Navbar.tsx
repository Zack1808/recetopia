import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaCircleUser, FaX } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";

import Modal from "./Modal";
import RegistrationForms from "../pages/RegistrationForms";

import { useAppSelector } from "../hooks/storeHook";

import Logo from "../assets/Logo.svg";

const Navbar: React.FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);

  const menuSmallScreenRef = useRef<HTMLDivElement>(null);

  const linkStyles: string = `text-white py-2  font-semibold text-md ${
    menuIsOpen ? "border-b px-6" : "px-3"
  }`;

  const { isLoggedIn } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const handleBackgroundClick = (event: MouseEvent) => {
      menuSmallScreenRef.current === event.target && closeMenu();
    };

    menuSmallScreenRef.current?.addEventListener(
      "click",
      handleBackgroundClick
    );

    return () => {
      menuSmallScreenRef.current?.removeEventListener(
        "click",
        handleBackgroundClick
      );
    };
  }, []);

  const handleSignUpLinkPress = (
    event: React.MouseEvent<HTMLAnchorElement>
  ) => {
    event.preventDefault();
    setModalIsOpen(true);
    closeMenu();
  };

  const closeMenu = () => {
    setMenuIsOpen(false);
  };

  return (
    <>
      {/* Menu big screen */}
      <div className="bg-orange-400 p-3 flex justify-center fixed w-full">
        <div className="w-full max-w-screen-2xl flex justify-between">
          <Link to="/" className="flex items-center gap-3 font-pacifico">
            <img src={Logo} className="w-14" alt="Logo" />
            <h2 className="text-4xl text-white">Recetopia</h2>
          </Link>
          <div className="text-white md:hidden flex justify-center items-center">
            <GiHamburgerMenu
              size={40}
              onClick={() => console.log("Hello")}
              onClickCapture={() => setMenuIsOpen(true)}
            />
          </div>
          <div className="md:flex gap-2 items-center hidden">
            <Link to="/" className={linkStyles}>
              Home
            </Link>
            {isLoggedIn ? (
              <>
                <Link to="/favorites" className={linkStyles}>
                  Favorites
                </Link>
                <Link to="/add-recipe" className={linkStyles}>
                  Add recipe
                </Link>
                <Link to="/profile" className={linkStyles}>
                  <FaCircleUser size={30} />
                </Link>
              </>
            ) : (
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
      </div>

      {/* Menu small screens */}
      <div
        className={`bg-black/20 top-0 bottom-0 left-0 right-0 fixed ${
          !menuIsOpen && "hidden"
        }`}
        ref={menuSmallScreenRef}
      >
        <div
          className={`absolute bg-orange-400 w-2/3 right-0 top-0 bottom-0 flex flex-col  gap-5`}
        >
          <div className="flex justify-between items-center p-3 pl-0">
            <Link
              to="/profile"
              className={`${linkStyles} border-none`}
              onClick={closeMenu}
            >
              <FaCircleUser size={30} />
            </Link>
            <FaX className="text-white" size={30} onClick={closeMenu} />
          </div>
          <div className="flex flex-col gap-2">
            <Link to="/" className={linkStyles} onClick={closeMenu}>
              Home
            </Link>
            {isLoggedIn ? (
              <>
                <Link
                  to="/favorites"
                  className={linkStyles}
                  onClick={closeMenu}
                >
                  Favorites
                </Link>
                <Link
                  to="/add-recipe"
                  className={linkStyles}
                  onClick={closeMenu}
                >
                  Add recipe
                </Link>
              </>
            ) : (
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
      </div>

      {/* Registration forms */}
      <Modal isOpen={modalIsOpen} handleClose={() => setModalIsOpen(false)}>
        <RegistrationForms />
      </Modal>
    </>
  );
};

export default Navbar;
