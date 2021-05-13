import React from "react";

import "./BookingDetailsSummary.scss";

const BookingDetailsSummary = ({
  adminPanelClassDetailsTitle,
  adminPanelClassTaxPriceTitle,
  adminPanelClassTaxPriceValue,
  totalPrice,
  subTotalPrice,
}) => {
  return (
    <div className="bookingDetails__summary">
      <h4
        className={
          adminPanelClassDetailsTitle === "adminPanelClassDetailsTitle"
            ? "bookingDetails__subtitle--admin"
            : "bookingDetails__subtitle"
        }
      >
        Summary
      </h4>
      <div className="bookingDetails__details-summary">
        <p
          className={
            adminPanelClassTaxPriceTitle === "adminPanelClassTaxPriceTitle"
              ? "bookingDetails__tax--admin"
              : "bookingDetails__tax"
          }
        >
          Tax:
          <span
            className={
              adminPanelClassTaxPriceValue === "adminPanelClassTaxPriceValue"
                ? "bookingDetails__tax-price--admin"
                : "bookingDetails__tax-price"
            }
          >
            {(totalPrice - subTotalPrice).toFixed(2)}€
          </span>
        </p>
        <p
          className={
            adminPanelClassTaxPriceTitle === "adminPanelClassTaxPriceTitle"
              ? "bookingDetails__price--admin"
              : "bookingDetails__price"
          }
        >
          Total price with tax:
          <span
            className={
              adminPanelClassTaxPriceValue === "adminPanelClassTaxPriceValue"
                ? "bookingDetails__total-price--admin"
                : "bookingDetails__total-price"
            }
          >
            {Boolean(totalPrice) && totalPrice.toFixed(2)}€
          </span>
        </p>
      </div>
    </div>
  );
};

export default BookingDetailsSummary;
