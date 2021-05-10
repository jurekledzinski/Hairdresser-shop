import React, { Fragment, useEffect } from "react";
import { useHistory } from "react-router-dom";

import "./BookingCancel.scss";

import { deleteBooking, deleteExcludedDate } from "../../../utils/sessions";

const BookingCancel = () => {
  const history = useHistory();

  let isCancel = false;

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

  //   Jezeli osoba przerwala zamowienie >3 to otrzyma 100% ceny serwisu a jeli poniezej <3 to 50% zostanie zwrocone, tak samo dla orderu dniach ponizeh <3 dni zwracamy tylko 50%

  return (
    <div className="booking-cancel">
      <div className="booking-cancel__text-wrapper">
        <p className="booking-cancel__icon">
          <i className="far fa-window-close"></i>
        </p>
        <h1 className="booking-cancel__title">
          Your order has been canceled successfully
        </h1>
        {isCancel && (
          <Fragment>
            <p className="booking-cancel__text">
              You canceled your order higher than 3 days before actual service,
              so we kindly inform you that we will return 100% of your pay.
            </p>
            <p className="booking-cancel__text">
              You can expect return of your money in 3 working days in your bank
              account
            </p>
            <p className="booking-cancel__text">
              Please read more information in our term shop policy
            </p>
          </Fragment>
        )}
        {isCancel && (
          <Fragment>
            <p className="booking-cancel__text">
              If you ordered sevice lower than 3 days before actual service in
              our shop and cancel this order, we kindly inform you that we
              charge 50% of your pay, due to the loss of possible clients
            </p>
            <p className="booking-cancel__text">
              You can expect return of your money in 3 working days in your bank
              account
            </p>
            <p className="booking-cancel__text">
              Please read more information in our term shop policy
            </p>
          </Fragment>
        )}
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
