import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./BookingCancel.scss";

import {
  cancelBookingSendEmailUser,
  deleteExcludedDateCancelCode,
} from "../../../utils/sessions";

import { fetchBookingUser } from "../../../reduxStore/actions/actionFetchOrderDetails";

const BookingCancelByCode = () => {
  const dispatch = useDispatch();
  const dataBookingUser = useSelector((store) => store.bookingUserData);

  const history = useHistory();

  let cancelCodeID = history.location.pathname.slice(21);

  const removeExcludedData = async () => {
    await deleteExcludedDateCancelCode(cancelCodeID);
    cancelCodeID = "";
  };

  const sendEmailConfirmationCancel = async (details) => {
    await cancelBookingSendEmailUser(details);
    cancelCodeID = "";
  };

  const handleRedirectHome = () => {
    history.push("/");
  };

  useEffect(() => {
    if (cancelCodeID) {
      removeExcludedData();
    }
  }, [cancelCodeID]);

  useEffect(() => {
    if (cancelCodeID) {
      dispatch(fetchBookingUser(cancelCodeID));
    }
  }, [cancelCodeID, dispatch]);

  useEffect(() => {
    if (
      !Array.isArray(dataBookingUser.bookingUser) &&
      dataBookingUser.bookingUser !== null &&
      dataBookingUser.bookingUser.cancelCode === cancelCodeID
    ) {
      const details = {
        bookingId: dataBookingUser.bookingUser.bookingId,
        cancelPaymentReturnPercent:
          dataBookingUser.bookingUser.cancelPaymentReturnPercent,
        dateAppointment: dataBookingUser.bookingUser.date,
        email: dataBookingUser.bookingUser.email,
        hairdresserName: dataBookingUser.bookingUser.hairdresserName,
        name: dataBookingUser.bookingUser.name,
        services: dataBookingUser.bookingUser.services,
        totalPrice: dataBookingUser.bookingUser.totalPrice,
      };
      sendEmailConfirmationCancel(details);
    }
  }, [dataBookingUser.bookingUser]);

  return (
    <div className="booking-cancel">
      <div className="booking-cancel__text-wrapper">
        <p className="booking-cancel__icon">
          <i className="far fa-window-close"></i>
        </p>
        <h1 className="booking-cancel__title">
          Your order has been canceled successfully, we hope you will come back
          soon.
        </h1>
        <p className="booking-cancel__text">
          You should soon receive an email confirmation cancel your order with
          all informations.
        </p>
        <p className="booking-cancel__text">
          Your pay should be return in 3 working days.
        </p>
        <p className="booking-cancel__text">
          Please read an email for more informations and terms and policy on our
          page.
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

export default BookingCancelByCode;
