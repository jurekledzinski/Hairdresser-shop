import React, { useRef, useState } from "react";
import ReactDOM from "react-dom";

import "./Modal.scss";

const Modal = ({ children, handleClose, isOpen, isPossibleToClose }) => {
  const refModal = useRef(null);

  const handleCloseOutside = ({ target }) => {
    const { current } = refModal;
    if (current === target && isPossibleToClose) {
      handleClose();
    }
  };

  const modalAll = isOpen ? (
    <div className="modal" ref={refModal} onClick={handleCloseOutside}>
      {children}
    </div>
  ) : null;
  return ReactDOM.createPortal(modalAll, document.querySelector("#root"));
};

export default Modal;
