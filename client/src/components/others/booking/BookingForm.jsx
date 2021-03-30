import React from "react";
import { useHistory } from "react-router-dom";

import "./BookingForm.scss";

import BookingFormChooseHairDresser from "./BookingFormChooseHairDresser";
import BookingFormDayTime from "./BookingFormDayTime";
import BookingFormChooseService from "./BookingFormChooseService";
import BookingFormNameEmailPhone from "./BookingFormNameEmailPhone";

const BookingForm = () => {
  const history = useHistory();
  const handleBookingForm = (e) => {
    e.preventDefault();
    const id = "123fkgsehddsfrt342dsf";
  };

  return (
    <form className="booking__form" onSubmit={handleBookingForm}>
      <BookingFormChooseHairDresser />
      <BookingFormDayTime />
      <BookingFormChooseService />
      <BookingFormNameEmailPhone />
      <button className="booking__button-continue">Continue</button>
    </form>
  );
};

export default BookingForm;
