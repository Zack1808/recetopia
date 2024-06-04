import React from "react";

import { TextareaProps } from "../interfaces/components";

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ title, required, ...rest }, ref) => {
    return (
      <div className="flex flex-col gap-1 w-full">
        <label className="font-medium" htmlFor={title}>
          {title}{" "}
          {required && <span className="text-orange-400 font-bold">*</span>}
        </label>
        <textarea
          ref={ref}
          {...rest}
          name={title?.toLowerCase().replace(/\s/g, "")}
          id={title}
          required={required}
          className="bg-gray-100 resize-none border-b-2 border-orange-300 focus:border-orange-500 focus:ring-orange-300 focus:ring-1 outline-none rounded min-h-52 px-3 py-2"
        ></textarea>
      </div>
    );
  }
);

export default Textarea;
