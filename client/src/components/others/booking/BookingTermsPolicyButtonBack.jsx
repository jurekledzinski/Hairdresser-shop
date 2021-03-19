import React from "react";
import { useHistory } from "react-router-dom";

import "./BookingTermsPolicyButtonBack.scss";

const BookingTermsPolicyButtonBack = () => {
  const history = useHistory();

  return (
    <button
      onClick={() => history.goBack()}
      className="booking__button-go-back-terms"
    >
      Go back
    </button>
  );
};

export default BookingTermsPolicyButtonBack;
