import React, { useState, useRef, useCallback } from "react";
import { FaImage, FaXmark } from "react-icons/fa6";

import Button from "./Button";

import { ImageUploadProps } from "../interfaces/components";

const ImageUpload = React.forwardRef<HTMLInputElement, ImageUploadProps>(
  ({ title, required, onChange, ...rest }, ref) => {
    const [imageName, setImageName] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const refs = useCallback(
      (node: HTMLInputElement) => {
        inputRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref)
          (ref as React.MutableRefObject<HTMLInputElement | null>).current =
            node;
      },
      [ref]
    );

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      !!onChange && onChange(event);
      if (!!!event.target.files || event.target.files.length <= 0) return;
      setImageName(event.target.files[0].name);
    };

    const handleRemoveImage = () => {
      if (!!!inputRef.current) return;
      inputRef.current.value = "";
      setImageName(null);
    };

    return (
      <div className="w-full flex flex-col gap-1">
        <label htmlFor={title}>
          {title}{" "}
          {required && <span className="text-orange-500 font-bold">*</span>}
        </label>
        <div
          className={`bg-gray-100 h-32 rounded flex justify-center items-center relative border-b-2 border-orange-300 focus-within:border-orange-500 transition focus-within:ring-1 ring-orange-300 ${rest.className}`}
        >
          <div className="flex gap-3 items-center font-semibold text-orange-400">
            {!!imageName ? (
              <>
                {imageName}{" "}
                <Button
                  type="button"
                  className=" z-10"
                  onClick={handleRemoveImage}
                >
                  <FaXmark />
                </Button>
              </>
            ) : (
              <>
                <FaImage className="text-4xl" /> Upload Image
              </>
            )}
          </div>
          <input
            onChange={handleChange}
            ref={refs}
            id={title}
            name={title.toLocaleLowerCase().replace(/\s/g, "")}
            {...rest}
            type="file"
            required={required}
            className="absolute top-0 bottom-0 right-0 left-0 opacity-0"
            accept=".jpg, .png, .webp, .jpeg"
          />
        </div>
      </div>
    );
  }
);

export default ImageUpload;
