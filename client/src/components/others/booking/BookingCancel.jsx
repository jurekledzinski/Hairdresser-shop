import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

import "./BookingCancel.scss";

import { deleteBooking, deleteExcludedDate } from "../../../utils/sessions";

const BookingCancel = () => {
  const history = useHistory();

  let currentBookingID = history.location.pathname.slice(16);

  const removeBookingData = async () => {
    await deleteBooking(currentBookingID);
  };

  const removeExcludedData = async () => {
    await deleteExcludedDate(currentBookingID);
  };

  const handleRedirectHome = () => {
    history.push("/");
  };

  useEffect(() => {
    if (currentBookingID) {
      removeBookingData();
      removeExcludedData();
    }
  }, [currentBookingID]);

  return (
    <div className="booking-cancel">
      <div className="booking-cancel__text-wrapper">
        <p className="booking-cancel__icon">
          <i className="far fa-window-close"></i>
        </p>
        <h1 className="booking-cancel__title">
          Your order has been canceled successfully
        </h1>
        <p className="booking-cancel__text">
          If you have any questions, please contact we us using contact form on
          our page.
        </p>
        <button
          className="booking-cancel__btn-redirect"
          onClick={handleRedirectHome}
        >
          Redirect home
        </button>
      </div>
    </div>
  );
};

export default BookingCancel;
