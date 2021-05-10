import React from "react";

import "./BookingOrderedServices.scss";

const BookingOrderedServices = ({ services }) => {
  return (
    <div className="bookingDetails__services">
      <h4 className="bookingDetails__subtitle">Ordered service</h4>
      <div className="bookingDetails__service-wrapper">
        {Boolean(services) &&
          services.map((item) => (
            <div className="bookingDetails__service" key={item._id}>
              <div className="bookingDetails__image">
                <img src={item.imageUrl} alt="Icon" />
              </div>
              <div className="bookingDetails__tax-price-wrapper">
                <p className="bookingDetails__service-name">{item.title}</p>
                <p className="bookingDetails__service-price">
                  {Boolean(item.price) && item.price.toFixed(2)}€
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default BookingOrderedServices;
