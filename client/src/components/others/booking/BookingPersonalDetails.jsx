import React from "react";

import "./BookingPersonalDetails.scss";

const BookingPersonalDetails = ({
  adminPanelClassDetailsTitle,
  adminPanelClassPersonDetails,
  adminPanelClassPersonText,
  email,
  date,
  hairdresserName,
  name,
  phone,
}) => {
  return (
    <div className="bookingDetails__personal-details">
      <h4
        className={
          adminPanelClassDetailsTitle === "adminPanelClassDetailsTitle"
            ? "bookingDetails__subtitle--admin bookingDetails__subtitle--reduce-margin"
            : "bookingDetails__subtitle bookingDetails__subtitle--reduce-margin"
        }
      >
        Personal details
      </h4>
      <p
        className={
          adminPanelClassPersonDetails === "adminPanelClassPersonDetails"
            ? "bookingDetails__service-title--admin"
            : "bookingDetails__service-title"
        }
      >
        HairDresser:
        <span
          className={
            adminPanelClassPersonText === "adminPanelClassPersonText"
              ? "bookingDetails__service-text--admin"
              : "bookingDetails__service-text"
          }
        >
          {hairdresserName}
        </span>
      </p>
      <p
        className={
          adminPanelClassPersonDetails === "adminPanelClassPersonDetails"
            ? "bookingDetails__service-title--admin"
            : "bookingDetails__service-title"
        }
      >
        Day:
        <span
          className={
            adminPanelClassPersonText === "adminPanelClassPersonText"
              ? "bookingDetails__service-text--admin"
              : "bookingDetails__service-text"
          }
        >
          {new Date(date).toLocaleDateString()}
        </span>
      </p>
      <p
        className={
          adminPanelClassPersonDetails === "adminPanelClassPersonDetails"
            ? "bookingDetails__service-title--admin"
            : "bookingDetails__service-title"
        }
      >
        Time:
        <span
          className={
            adminPanelClassPersonText === "adminPanelClassPersonText"
              ? "bookingDetails__service-text--admin"
              : "bookingDetails__service-text"
          }
        >
          {new Date(date).toLocaleTimeString().slice(0, 5)}
        </span>
      </p>
      <p
        className={
          adminPanelClassPersonDetails === "adminPanelClassPersonDetails"
            ? "bookingDetails__service-title--admin"
            : "bookingDetails__service-title"
        }
      >
        Name:
        <span
          className={
            adminPanelClassPersonText === "adminPanelClassPersonText"
              ? "bookingDetails__service-text--admin"
              : "bookingDetails__service-text"
          }
        >
          {name}
        </span>
      </p>
      <p
        className={
          adminPanelClassPersonDetails === "adminPanelClassPersonDetails"
            ? "bookingDetails__service-title--admin"
            : "bookingDetails__service-title"
        }
      >
        Email:
        <span
          className={
            adminPanelClassPersonText === "adminPanelClassPersonText"
              ? "bookingDetails__service-text--admin"
              : "bookingDetails__service-text"
          }
        >
          {Boolean(email) && email}
        </span>
      </p>
      <p
        className={
          adminPanelClassPersonDetails === "adminPanelClassPersonDetails"
            ? "bookingDetails__service-title--admin"
            : "bookingDetails__service-title"
        }
      >
        Phone number:
        <span
          className={
            adminPanelClassPersonText === "adminPanelClassPersonText"
              ? "bookingDetails__service-text--admin"
              : "bookingDetails__service-text"
          }
        >
          {phone}
        </span>
      </p>
    </div>
  );
};

export default BookingPersonalDetails;
