import React, { Fragment } from "react";

import "./BookingFormNameEmailPhone.scss";

const BookingFormNameEmailPhone = () => {
  return (
    <Fragment>
      <div className="booking__input-wrapper">
        <label className="booking__label">Name and surname</label>
        <input className="booking__input" type="text" />
      </div>
      <div className="booking__input-wrapper">
        <label className="booking__label">Email</label>
        <input className="booking__input" type="email" />
      </div>
      <div className="booking__input-wrapper">
        <label className="booking__label">Phone number</label>
        <input className="booking__input" type="email" />
      </div>
    </Fragment>
  );
};

export default BookingFormNameEmailPhone;
