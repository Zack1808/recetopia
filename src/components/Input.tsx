import React, { useState } from "react";
import classNames from "classnames";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

import { InputProps } from "../interfaces/components";

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ type, title, required, ...rest }, ref) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const classes = classNames(
      rest?.className,
      "border-b-2 border-orange-300 rounded flex focus-within:ring-1 focus-within:ring-orange-300 focus-within:border-orange-500 transition bg-gray-100"
    );

    const handleClickEvent = () => {
      setIsVisible((prevState) => !prevState);
    };

    return (
      <div className="flex flex-col gap-1 w-full">
        {!!title && (
          <label htmlFor={title} className="font-medium">
            {title}{" "}
            {required && (
              <span className="font-semibold text-orange-500">*</span>
            )}
          </label>
        )}

        <div className={classes}>
          <input
            {...rest}
            type={isVisible ? "text" : type}
            id={title}
            ref={ref}
            required={required}
            className="py-2 px-3 flex-1 focus:outline-none bg-gray-100"
          />

          {type === "password" && (
            <button onClick={handleClickEvent} type="button" className="px-3">
              {isVisible ? (
                <FaEyeSlash className="text-orange-500" />
              ) : (
                <FaEye className="text-orange-500" />
              )}
            </button>
          )}
        </div>
      </div>
    );
  }
);

export default Input;
