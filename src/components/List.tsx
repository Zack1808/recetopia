import React from "react";
import { FaXmark } from "react-icons/fa6";

import Button from "./Button";

import { ListProps } from "../interfaces/components";

const List: React.FC<ListProps> = ({ list, removeItem }) => {
  return (
    <ol className="flex w-full flex-col gap-2">
      {list.map((item, index) => (
        <li className="flex gap-2 justify-between items-center">
          <div className="flex gap-3 items-baseline">
            <span className="text-gray-700 font-semibold ">{index + 1}.</span>{" "}
            {item}
          </div>
          <Button type="button" secondary onClick={() => removeItem(index)}>
            <FaXmark />
          </Button>
        </li>
      ))}
    </ol>
  );
};

export default List;
