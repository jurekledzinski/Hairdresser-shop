import React from "react";

import "./BookingDetailsSummary.scss";

const BookingDetailsSummary = ({ totalPrice, subTotalPrice }) => {
  return (
    <div className="bookingDetails__summary">
      <h4 className="bookingDetails__subtitle">Summary</h4>
      <div className="bookingDetails__details-summary">
        <p className="bookingDetails__tax">
          Tax:
          <span className="bookingDetails__tax-price">
            {(totalPrice - subTotalPrice).toFixed(2)}€
          </span>
        </p>
        <p className="bookingDetails__price">
          Total price with tax:
          <span className="bookingDetails__total-price">
            {totalPrice.toFixed(2)}€
          </span>
        </p>
      </div>
    </div>
  );
};

export default BookingDetailsSummary;
