import React from "react";

import "./BookingPersonalDetails";

const BookingPersonalDetails = ({
  email,
  date,
  hairdresserName,
  name,
  phone,
}) => {
  return (
    <div className="bookingDetails__personal-details">
      <h4 className="bookingDetails__subtitle bookingDetails__subtitle--reduce-margin">
        Personal details
      </h4>
      <p className="bookingDetails__service-title">
        HairDresser:
        <span className="bookingDetails__service-text">{hairdresserName}</span>
      </p>
      <p className="bookingDetails__service-title">
        Day:
        <span className="bookingDetails__service-text">
          {new Date(date).toLocaleDateString()}
        </span>
      </p>
      <p className="bookingDetails__service-title">
        Time:
        <span className="bookingDetails__service-text">
          {new Date(date).toLocaleTimeString().slice(0, 5)}
        </span>
      </p>
      <p className="bookingDetails__service-title">
        Name:
        <span className="bookingDetails__service-text">{name}</span>
      </p>
      <p className="bookingDetails__service-title">
        Email:
        <span className="bookingDetails__service-text">
          {Boolean(email) && email}
        </span>
      </p>
      <p className="bookingDetails__service-title">
        Phone number:
        <span className="bookingDetails__service-text">{phone}</span>
      </p>
    </div>
  );
};

export default BookingPersonalDetails;
