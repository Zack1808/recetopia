import React from "react";
import classNames from "classnames";

import { ButtonProps } from "../interfaces/components";

const Button: React.FC<ButtonProps> = ({
  children,
  primary,
  secondary,
  className,
  disabled,
  ...rest
}) => {
  const classes = classNames(
    className,
    "px-4 py-2 flex items-center gap-2 transition rounded",
    {
      "border-orange-400 border hover:border-orange-500 font-medium":
        primary || secondary,
      "text-orange-400 hover:bg-gray-50 hover:text-orange-500": secondary,
      "text-white bg-orange-400 hover:bg-orange-500": primary,
      "hover:bg-gray-50": !primary && !secondary,
      "bg-gray-500 hover:bg-gray-500 border-gray-500 hover:border-gray-500":
        disabled || (disabled && primary) || (disabled && secondary),
    }
  );

  // Validation to check that only one variant is being used
  if (Number(!!primary) + Number(!!secondary) > 1)
    throw new Error("Button component can only be used with one variant!");

  return (
    <button {...rest} className={classes} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
