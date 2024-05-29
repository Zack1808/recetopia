import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { FaXmark } from "react-icons/fa6";

import { ModalProps } from "../interfaces/components";
import Button from "./Button";

const Modal: React.FC<ModalProps> = ({
  children,
  title,
  handleClose,
  isOpen,
}) => {
  const modalOverlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleModalOverlayClick = (event: MouseEvent) => {
      modalOverlayRef?.current === event.target && handleClose();
    };

    modalOverlayRef?.current?.addEventListener(
      "click",
      handleModalOverlayClick
    );

    return () => {
      modalOverlayRef?.current?.removeEventListener(
        "click",
        handleModalOverlayClick
      );
    };
  });

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      ref={modalOverlayRef}
      className="bg-black/20 fixed top-0 bottom-0 right-0 left-0 flex justify-center items-center p-4"
    >
      <div className="bg-white p-3 rounded w-full max-w-2xl">
        <div className="flex justify-between items-center pb-5">
          <h2 className="text-xl mb-1">{title}</h2>
          <Button onClick={handleClose}>
            <FaXmark className="text-xl" />
          </Button>
        </div>
        <>{children}</>
      </div>
    </div>,
    document.getElementById("modal")!
  );
};

export default Modal;
