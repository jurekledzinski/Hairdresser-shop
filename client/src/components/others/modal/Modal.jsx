import React, { useRef } from "react";
import ReactDOM from "react-dom";

import "./Modal.scss";

const Modal = ({ children, isOpen, cantCloseWhenClickModal }) => {
  const modalRef = useRef();

  const modalAll = isOpen ? (
    <div className="modal" ref={modalRef}>
      {children}
    </div>
  ) : null;

  return ReactDOM.createPortal(modalAll, document.querySelector("#root"));
};

export default Modal;
