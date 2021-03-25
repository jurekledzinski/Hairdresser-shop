import React, { useEffect, useRef } from "react";

import "./BookingDetails.scss";

import BookingGoBackButton from "./BookingGoBackButton";

const BookingDetails = () => {
  const serviceWrapperRef = useRef(null);

  useEffect(() => {
    if (serviceWrapperRef.current) {
      console.log(serviceWrapperRef.current.offsetHeight);
    }
  }, []);

  return (
    <section className="bookingDetails">
      <div className="bookingDetails__center-wrapper">
        <BookingGoBackButton />
        <div className="bookingDetails__wrapper">
          <div className="bookingDetails__left"></div>
          <div className="bookingDetails__right">
            <div className="bookingDetails__inside-wrapper">
              <h2 className="bookingDetails__title">Booking details</h2>
              <div className="bookingDetails__details">
                <div className="bookingDetails__personal-details">
                  <h4 className="bookingDetails__subtitle bookingDetails__subtitle--reduce-margin">
                    Personal details
                  </h4>
                  <p className="bookingDetails__service-title">
                    HairDresser:
                    <span className="bookingDetails__service-text">
                      Joe Doe
                    </span>
                  </p>
                  <p className="bookingDetails__service-title">
                    Day:
                    <span className="bookingDetails__service-text">
                      27.03.2021
                    </span>
                  </p>
                  <p className="bookingDetails__service-title">
                    Time:
                    <span className="bookingDetails__service-text">
                      9:45 a.m.
                    </span>
                  </p>
                  <p className="bookingDetails__service-title">
                    Name:
                    <span className="bookingDetails__service-text">
                      Kate Swanson
                    </span>
                  </p>
                  <p className="bookingDetails__service-title">
                    Email:
                    <span className="bookingDetails__service-text">
                      kateswanson@gmail.com
                    </span>
                  </p>
                  <p className="bookingDetails__service-title">
                    Phone number:
                    <span className="bookingDetails__service-text">
                      651344774
                    </span>
                  </p>
                </div>
                <div className="bookingDetails__services">
                  <h4 className="bookingDetails__subtitle">Ordered service</h4>
                  <div
                    className="bookingDetails__service-wrapper"
                    ref={serviceWrapperRef}
                  >
                    <div className="bookingDetails__service">
                      <div className="bookingDetails__image">
                        <img
                          src="https://firebasestorage.googleapis.com/v0/b/hairdress-shop.appspot.com/o/Haircut-men.png?alt=media&token=deab2f3f-ea58-421e-9eb6-df411c448163"
                          alt="Icon"
                        />
                      </div>
                      <div className="bookingDetails__tax-price-wrapper">
                        <p className="bookingDetails__service-name">
                          Classic haircut
                        </p>
                        <p className="bookingDetails__service-price">3.25€</p>
                      </div>
                    </div>
                    <div className="bookingDetails__service">
                      <div className="bookingDetails__image">
                        <img
                          src="https://firebasestorage.googleapis.com/v0/b/hairdress-shop.appspot.com/o/Haircut-men.png?alt=media&token=deab2f3f-ea58-421e-9eb6-df411c448163"
                          alt="Icon"
                        />
                      </div>
                      <div className="bookingDetails__tax-price-wrapper">
                        <p className="bookingDetails__service-name">
                          Classic haircut
                        </p>
                        <p className="bookingDetails__service-price">3.25€</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bookingDetails__summary">
                  <h4 className="bookingDetails__subtitle">Summary</h4>
                  <div className="bookingDetails__details-summary">
                    <p className="bookingDetails__tax">
                      Tax:
                      <span className="bookingDetails__tax-price">1.40€</span>
                    </p>
                    <p className="bookingDetails__price">
                      Total price:
                      <span className="bookingDetails__total-price">4.65€</span>
                    </p>
                  </div>
                </div>
                <div className="bookingDetails__confirm-terms-shop">
                  <label className="bookingDetails__confirm-terms">
                    <input
                      className="bookingDetails__confirm-checkbox"
                      type="checkbox"
                    />
                    I agree with terms policy of Hair planet shop
                  </label>
                </div>
                <div className="bookingDetails__button-wrapper">
                  <button className="bookingDetails__button-checkout">
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingDetails;
