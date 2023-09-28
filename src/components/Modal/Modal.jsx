import { useEffect } from "react";
import ReactDOM from "react-dom";
import { FaTimes } from "react-icons/fa";

// Importing the costume components
import Button from "../Button/Button";

// Importing the style file
import "./Modal.css";

// Creating the Modal component
const Modal = ({ close, title, children }) => {
  // Disabeling scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => (document.body.style.overflow = "auto");
  });

  return ReactDOM.createPortal(
    <div className="modal">
      <div className="modal-container">
        <div className="header">
          <h2>{title}</h2>
          <Button onClick={close}>
            <FaTimes />
          </Button>
        </div>
        <div className="body">{children}</div>
      </div>
    </div>,
    document.getElementById("modal")
  );
};

// Exporting the component
export default Modal;
