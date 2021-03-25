import React from "react";
import { useHistory } from "react-router-dom";

import "./BookingGoBackButton.scss";

const BookingGoBackButton = () => {
  const history = useHistory();
  return (
    <button
      onClick={() => history.goBack()}
      className="booking__button-go-back"
    >
      Go back
    </button>
  );
};

export default BookingGoBackButton;
