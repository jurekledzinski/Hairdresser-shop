import React, { useState } from "react";

import "./BookingMainPage.scss";

import Modal from "../modal/Modal";

const BookingMainPage = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <Modal isOpen={isOpen}>
      <section className="booking">
        <div className="booking__wrapper">
          <div className="booking__left"></div>
          <div className="booking__right">
            <div className="booking__form-wrapper"></div>
          </div>
        </div>
      </section>
    </Modal>
  );
};

export default BookingMainPage;
