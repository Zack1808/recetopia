import React from "react";
import classNames from "classnames";

import { ButtonProps } from "../interfaces/components";

const Button: React.FC<ButtonProps> = ({
  children,
  primary,
  secondary,
  className,
  ...rest
}) => {
  const classes = classNames(
    className,
    "px-4 py-2 flex items-center gap-2 transition rounded",
    {
      "border-orange-400 border hover:border-orange-500 font-medium":
        primary || secondary,
      "text-orange-400 hover:bg-slate-50 hover:text-orange-500": secondary,
      "text-white bg-orange-400 hover:bg-orange-500": primary,
      "hover:bg-slate-50": !primary && !secondary,
    }
  );

  // Validation to check that only one variant is being used
  if (Number(!!primary) + Number(!!secondary) > 1)
    throw new Error("Button component can only be used with one variant!");

  return (
    <button {...rest} className={classes}>
      {children}
    </button>
  );
};

export default Button;
