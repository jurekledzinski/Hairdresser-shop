import React from "react";
import { Link } from "react-router-dom";

import "./BookingTermsConditions.scss";

const BookingTermsConditions = () => {
  return (
    <div className="booking__conditions-wrapper">
      <p className="booking__terms-policy">
        You can cancel your appointment minimum 72 hours before day of
        appointment, less than 72 hours we charge 50% of the service from your
        service pay.{" "}
        <Link className="booking__read-more" to="/term-policy">
          Read more...
        </Link>
      </p>
    </div>
  );
};

export default BookingTermsConditions;
