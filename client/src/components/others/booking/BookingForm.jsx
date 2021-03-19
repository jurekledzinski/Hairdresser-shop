import React from "react";

import "./BookingForm.scss";

import BookingFormChooseHairDresser from "./BookingFormChooseHairDresser";
import BookingFormDayTime from "./BookingFormDayTime";
import BookingFormChooseService from "./BookingFormChooseService";
import BookingFormNameEmailPhone from "./BookingFormNameEmailPhone";

const BookingForm = () => {
  return (
    <form className="booking__form">
      <BookingFormChooseHairDresser />
      <BookingFormDayTime />
      <BookingFormChooseService />
      <BookingFormNameEmailPhone />
      <button className="booking__button-continue">Continue</button>
    </form>
  );
};

export default BookingForm;
