import React from "react";

import "./AdminAppointmentMessagePopup.scss";

import Modal from "../../modal/Modal";

const AdminAppointmentMessagePopup = ({
  isOpenModal,
  handleRedirect,
  messageTitle,
}) => {
  return (
    <Modal isOpen={isOpenModal}>
      <div
        className={
          isOpenModal
            ? "admin-message-popup admin-message-popup--active"
            : "admin-message-popup"
        }
      >
        <h4 className="admin-message-popup__title">{messageTitle}</h4>
        <p className="admin-message-popup__text">
          Soon you should recive an email confirmation with all details of your
          order.
        </p>

        <button
          className="admin-message-popup__button-redirect"
          onClick={handleRedirect}
        >
          Back to admin
        </button>
      </div>
    </Modal>
  );
};

export default AdminAppointmentMessagePopup;
