import React from "react";

import "./BookingCancelForm.scss";

const BookingCancelForm = () => {
  return (
    <div className="booking__cancel-wrapper">
      <form className="booking__cancel-form">
        <div className="booking__cancel-input-wrapper">
          <label className="booking__cancel-label">
            Type in your code to cancel appointment
          </label>
          <input type="text" className="booking__cancel-input" />
        </div>
        <button className="booking__button-cancel">Cancel</button>
      </form>
    </div>
  );
};

export default BookingCancelForm;
