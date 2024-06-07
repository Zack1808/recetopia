import React from "react";
import { FaCopyright } from "react-icons/fa6";

const Footer: React.FC = () => {
  return (
    <div className="mt-auto bg-orange-400 px-3 flex text-white justify-center py-10 items-center gap-2">
      <FaCopyright /> JPN
    </div>
  );
};

export default Footer;
