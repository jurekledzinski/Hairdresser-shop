import React from "react";

import "./MessagePopup.scss";

import Modal from "../../modal/Modal";

const MessagePopup = ({
  isOpenModal,
  handleRemoveItem,
  handleNotRemoveItem,
  purpose,
}) => {
  return (
    <Modal isOpen={isOpenModal}>
      <div
        className={
          isOpenModal ? "message-popup message-popup--active" : "message-popup"
        }
      >
        <h4 className="message-popup__title">
          Are you sure you want remove this {purpose}?
        </h4>
        <div className="message-popup__wrapper-btns">
          <button
            className="message-popup__button-yes"
            onClick={handleRemoveItem}
          >
            Yes
          </button>
          <button
            className="message-popup__button-no"
            onClick={handleNotRemoveItem}
          >
            No
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default MessagePopup;
