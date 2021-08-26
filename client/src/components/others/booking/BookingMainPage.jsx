import React from "react";
import { useDispatch } from "react-redux";

import "./BookingMainPage.scss";

import BookingForm from "./BookingForm";
import BookingCancelForm from "./BookingCancelForm";
import BookingTermsConditions from "./BookingTermsConditions";
import BookingGoBackButton from "./BookingGoBackButton";

import useLoadBgImg from "../../../customHooks/useLoadBgImg";
import CircleSpinner from "../spinner/CircleSpinner";

import { setCloseDivChooseService } from "../../../reduxStore/actions/actionCloseChooseService";

const BookingMainPage = () => {
  const dispatch = useDispatch();
  const bookUrl =
    "https://firebasestorage.googleapis.com/v0/b/hairdress-shop.appspot.com/o/Background-booking.jpeg?alt=media&token=043b3596-878c-49ff-a10c-002b66da3570";
  const isLoad = useLoadBgImg(bookUrl);

  const handleCloseChooseService = (e) => {
    dispatch(setCloseDivChooseService(e.target.dataset.outside));
  };

  return (
    <section
      className="booking"
      onClick={handleCloseChooseService}
      data-outside="bookingOutside"
    >
      <div className="booking__center-wrapper">
        <BookingGoBackButton />
        <div className="booking__wrapper">
          <div className="booking__left">
            {!isLoad && (
              <div className="booking__overlay">
                <CircleSpinner />
              </div>
            )}
          </div>
          <div className="booking__right">
            <div className="booking__inside-wrapper">
              <h2 className="booking__title">Book seat now</h2>
              <div
                className="booking__form-wrapper"
                data-outside="bookingOutside"
              >
                <BookingForm />
              </div>
              <BookingCancelForm />
              <BookingTermsConditions />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingMainPage;
