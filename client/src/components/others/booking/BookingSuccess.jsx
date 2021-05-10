import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./BookingSuccess.scss";

import {
  bookingConfirmCancelOrSuccess,
  updateSingleBooking,
} from "../../../utils/sessions";
import { fetchBookingUser } from "../../../reduxStore/actions/actionFetchOrderDetails";

const BookingSuccess = () => {
  const dispatch = useDispatch();
  const dataBookingUser = useSelector((store) => store.bookingUserData);

  console.log(dataBookingUser, " dataBookingUser");

  const history = useHistory();

  const bookingID = history.location.pathname.slice(17);

  const updateBookingCustomer = async (booking) => {
    await updateSingleBooking(booking);
  };

  const sendEmailConfirmation = async (details) => {
    await bookingConfirmCancelOrSuccess(details);
  };

  useEffect(() => {
    if (bookingID) {
      dispatch(fetchBookingUser(bookingID));
    }
  }, [bookingID, dispatch]);

  useEffect(() => {
    if (
      !Array.isArray(dataBookingUser.bookingUser) &&
      dataBookingUser.bookingUser !== null
    ) {
      let updatedBooking = dataBookingUser.bookingUser;

      updatedBooking.isPayed = true;
      delete updatedBooking.__v;

      updateBookingCustomer(updatedBooking);
    }
  }, [dataBookingUser.bookingUser]);

  useEffect(() => {
    if (
      !Array.isArray(dataBookingUser.bookingUser) &&
      dataBookingUser.bookingUser !== null
    ) {
      const details = {
        bookingId: dataBookingUser.bookingUser.bookingId,
        cancelCode: dataBookingUser.bookingUser.cancelCode,
        dateAppointment: dataBookingUser.bookingUser.date,
        email: dataBookingUser.bookingUser.email,
        hairdresserName: dataBookingUser.bookingUser.hairdresserName,
        name: dataBookingUser.bookingUser.name,
        services: dataBookingUser.bookingUser.services,
        totalPrice: dataBookingUser.bookingUser.totalPrice,
      };
      sendEmailConfirmation(details);
    }
  }, [dataBookingUser.bookingUser]);

  const handleRedirectHome = () => {
    history.push("/");
  };

  return (
    <div className="booking-success">
      <div className="booking-success__text-wrapper">
        <p className="booking-success__icon">
          <i className="far fa-check-circle"></i>
        </p>
        <h1 className="booking-success__title">Thank you for your order</h1>
        <p className="booking-success__text">
          Soon you should recive an email confirmation with all details of your
          order.
        </p>
        <p className="booking-success__text">
          We hope to see you in our salon, soon.
        </p>
        <button
          className="booking-success__btn-redirect"
          onClick={handleRedirectHome}
        >
          Redirect home
        </button>
      </div>
    </div>
  );
};

export default BookingSuccess;
