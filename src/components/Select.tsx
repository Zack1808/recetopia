import React, { useState, useEffect, useRef } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

import { SelectProps, SelectOptionsProps } from "../interfaces/components";

const Select: React.FC<SelectProps> = ({
  title,
  multiple,
  required,
  name,
  placeholder,
  value,
  onChange,
  options,
  className,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(0);

  const selectRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLUListElement>(null);

  const handleClear = (event: React.MouseEvent) => {
    event.stopPropagation();
    multiple ? onChange([]) : onChange(undefined);
  };

  const handleSelection = (option: SelectOptionsProps) => {
    if (multiple) {
      if (value.includes(option)) {
        onChange(value.filter((op) => op !== option));
      } else {
        onChange([...value, option]);
      }
    } else onChange(option);
  };

  const isOptionSelected = (option: SelectOptionsProps) => {
    return multiple ? value.includes(option) : option === value;
  };

  useEffect(() => {
    setHighlightedIndex(0);
    if (dropdownRef.current) {
      const firstItem = dropdownRef.current.children[0];
      if (firstItem) {
        (firstItem as HTMLElement).scrollIntoView({ block: "nearest" });
      }
    }
  }, [isOpen]);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.target !== selectRef.current) return;
      console.log(event.key);
      switch (event.code) {
        case "Enter":
        case "Space":
          setIsOpen((prevState) => !prevState);
          isOpen && handleSelection(options[highlightedIndex]);
          break;
        case "ArrowUp":
        case "ArrowDown": {
          if (!isOpen) {
            setIsOpen(true);
            break;
          }
          const newValue =
            highlightedIndex + (event.code === "ArrowDown" ? 1 : -1);
          if (newValue >= 0 && newValue < options.length)
            setHighlightedIndex(newValue);
          break;
        }
        case "Escape":
          setIsOpen(false);
          break;
      }
    };
    selectRef.current?.addEventListener("keydown", handler);

    return () => {
      selectRef.current?.removeEventListener("keydown", handler);
    };
  }, [isOpen, highlightedIndex, options]);

  useEffect(() => {
    if (dropdownRef.current) {
      const highlightedItem = dropdownRef.current.children[highlightedIndex];
      if (highlightedItem) {
        (highlightedItem as HTMLElement).scrollIntoView({
          block: "nearest",
        });
      }
    }
  }, [highlightedIndex]);

  return (
    <div className="flex flex-col gap-1 w-full">
      <label htmlFor={name} className="font-medium">
        {title}{" "}
        {required && <span className="text-orange-500 font-bold">*</span>}
      </label>

      <div
        ref={selectRef}
        onBlur={() => setIsOpen(false)}
        onClick={() => setIsOpen((prevState) => !prevState)}
        tabIndex={0}
        className={`w-full px-3 py-2 bg-gray-100 rounded border-b-2 border-orange-300 md:relative  flex items-center gap-2 focus-within:ring-1 focus-within:ring-orange-300 focus-within:border-orange-500 outline-none cursor-pointer ${className}`}
      >
        <input type="text" className="hidden" id={name} />
        <span className="flex flex-1 gap-2 flex-wrap">
          {(multiple
            ? value.length > 0 &&
              value.map((val) => (
                <button
                  key={val.value}
                  className="bg-orange-400 flex items-center gap-2 py-1 px-2 rounded text-white hover:bg-orange-500 transition text-xs"
                  onClick={(event) => {
                    event.stopPropagation();
                    handleSelection(val);
                  }}
                >
                  {val.label}
                  <FaXmark />
                </button>
              ))
            : value?.label) || (
            <span className="text-gray-400">{placeholder}</span>
          )}
        </span>

        {multiple
          ? value.length > 0 && (
              <button type="button" onClick={handleClear}>
                <FaXmark />
              </button>
            )
          : !!value && (
              <button type="button" onClick={handleClear}>
                <FaXmark />
              </button>
            )}

        <div className="self-stretch border border-gray-300"></div>
        {isOpen ? (
          <FaCaretUp className="text-lg text-gray-700" />
        ) : (
          <FaCaretDown className="text-lg text-gray-700" />
        )}
        <div
          className={`md:top-full md:bg-transparent md:p-0 bottom-0  p-3 top-0 md:mt-2 left-0 md:absolute fixed z-20 w-full bg-black/20 flex items-center  ${
            isOpen ? "md:block flex" : "hidden"
          }`}
        >
          <ul
            ref={dropdownRef}
            className={`md:max-h-60 max-h-96 overflow-y-auto bg-gray-100 rounded w-full md:divide-y-0  divide-y divide-gray-300 border border-gray-300`}
          >
            {options.map((option, index) => (
              <li
                onMouseEnter={() => setHighlightedIndex(index)}
                onClick={(event) => {
                  !!multiple && event.stopPropagation();
                  handleSelection(option);
                }}
                className={`p-3 cursor-pointer hover:bg-gray-200 ${
                  isOptionSelected(option)
                    ? `bg-gray-300 hover:bg-gray-400 hover:text-white ${
                        highlightedIndex === index
                          ? "bg-gray-400 text-white"
                          : ""
                      }`
                    : highlightedIndex === index
                    ? "bg-gray-200"
                    : ""
                } `}
                key={option.value}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Select;
