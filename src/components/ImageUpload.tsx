import React from "react";
import { FaImage } from "react-icons/fa6";

import { ImageUploadProps } from "../interfaces/components";

const ImageUpload = React.forwardRef<HTMLInputElement, ImageUploadProps>(
  ({ title, required, ...rest }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1">
        <label htmlFor={title}>
          {title}{" "}
          {required && <span className="text-orange-500 font-bold">*</span>}
        </label>
        <div className="bg-gray-100 h-32 rounded flex justify-center items-center relative border-b-2 border-orange-300 focus-within:border-orange-500 focus-within:ring-1 ring-orange-300">
          <div className="flex gap-3 items-center font-semibold text-orange-400">
            <FaImage className="text-4xl" /> Upload Image
          </div>
          <input
            ref={ref}
            id={title}
            name={title.toLocaleLowerCase().replace(/\s/g, "")}
            {...rest}
            type="file"
            required={required}
            className="absolute top-0 bottom-0 right-0 left-0 opacity-0"
          />
        </div>
      </div>
    );
  }
);

export default ImageUpload;
