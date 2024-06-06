import React from "react";
import { Link } from "react-router-dom";

import { CardProps } from "../interfaces/components";

const Card: React.FC<CardProps> = ({ user, title, image, id }) => {
  const cardStyle = {
    backgroundImage: `url(${image})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <Link
      to={`/recipe/${id}`}
      className={`relative flex min-h-96 rounded p-5 items-end overflow-hidden `}
    >
      <div
        style={cardStyle}
        className={`absolute top-0 bottom-0 bg-center left-0 right-0 hover:scale-105 transition-transform duration-500`}
      ></div>
      <div className="flex flex-col items-start z-10">
        <h4 className="px-3 py-1 bg-white rounded-t">{user}</h4>
        <h3 className="px-3 py-1 bg-orange-400 rounded-r rounded-bl font-semibold text-white">
          {title}
        </h3>
      </div>
    </Link>
  );
};

export default Card;
