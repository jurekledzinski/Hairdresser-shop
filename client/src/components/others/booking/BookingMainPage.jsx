import React from "react";

import "./BookingMainPage.scss";

import BookingForm from "./BookingForm";
import BookingCancelForm from "./BookingCancelForm";
import BookingTermsConditions from "./BookingTermsConditions";
import BookingGoBackButton from "./BookingGoBackButton";

const BookingMainPage = () => {
  return (
    <section className="booking">
      <div className="booking__center-wrapper">
        <BookingGoBackButton />
        <div className="booking__wrapper">
          <div className="booking__left"></div>
          <div className="booking__right">
            <div className="booking__inside-wrapper">
              <h2 className="booking__title">Book seat now</h2>
              <div className="booking__form-wrapper">
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
