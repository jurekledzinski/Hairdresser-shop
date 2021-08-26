import React from "react";

import "./BookingOrderedServices.scss";

const BookingOrderedServices = ({
  adminPanelClassDetailsTitle,
  adminPanelClassServiceName,
  adminPanelClassServicePrice,
  adminPanelClassStyleScroll,
  services,
}) => {
  return (
    <div className="bookingDetails__services">
      <h4
        className={
          adminPanelClassDetailsTitle === "adminPanelClassDetailsTitle"
            ? "bookingDetails__subtitle--admin"
            : "bookingDetails__subtitle"
        }
      >
        Ordered service
      </h4>
      <div
        className={
          adminPanelClassStyleScroll
            ? "bookingDetails__service-wrapper bookingDetails__service-wrapper--style-scroll"
            : "bookingDetails__service-wrapper"
        }
      >
        {Boolean(services) &&
          services.map((item) => (
            <div className="bookingDetails__service" key={item._id}>
              <div className="bookingDetails__image">
                <img
                  className="bookingDetails__img"
                  src={item.imageUrl}
                  alt="Icon"
                />
              </div>
              <div className="bookingDetails__tax-price-wrapper">
                <p
                  className={
                    adminPanelClassServiceName === "adminPanelClassServiceName"
                      ? "bookingDetails__service-name--admin"
                      : "bookingDetails__service-name"
                  }
                >
                  {item.title}
                </p>
                <p
                  className={
                    adminPanelClassServicePrice ===
                    "adminPanelClassServicePrice"
                      ? "bookingDetails__service-price--admin"
                      : "bookingDetails__service-price"
                  }
                >
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
