import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import "./AdminBookedDetails.scss";

const AdminBookedDetails = () => {
  const idParams = useParams();
  const dataBookedOrdersToUse = useSelector((store) => store.bookedOrdersData);
  const [dataBooked, setDataBooked] = useState(null);

  useEffect(() => {
    if (dataBookedOrdersToUse.length > 0) {
      const currentOrder = dataBookedOrdersToUse.filter(
        (item) => item._id === idParams.id
      );

      setDataBooked(currentOrder);
    }
  }, [dataBookedOrdersToUse]);

  return (
    <article className="booked-details">
      {dataBooked !== null
        ? dataBooked.map((item, index) => (
            <Fragment key={index}>
              <h3 className="booked-details__booking-title">
                Booking information
              </h3>
              <div className="booked-details__text-wrapper">
                <p className="booked-details__name-title">Booking ID:</p>
                <p className="booked-details__value">{item.bookingId}</p>
              </div>
              <div className="booked-details__text-wrapper">
                <p className="booked-details__name-title">Booking day:</p>
                <p className="booked-details__value">
                  {new Date(item.date).toLocaleDateString()}
                </p>
              </div>
              <div className="booked-details__text-wrapper">
                <p className="booked-details__name-title">Booking Time:</p>
                <p className="booked-details__value">
                  {new Date(item.bookTime).toLocaleTimeString().slice(0, 5)}
                </p>
              </div>
              <div className="booked-details__text-wrapper">
                <p className="booked-details__name-title">Place booking:</p>
                <p className="booked-details__value">{item.bookingWhere}</p>
              </div>
              <div className="booked-details__text-wrapper">
                <p className="booked-details__name-title">Cancel code:</p>
                <p className="booked-details__value">{item.cancelCode}</p>
              </div>
              <div className="booked-details__text-wrapper">
                <p className="booked-details__name-title">Date payment:</p>
                <p className="booked-details__value">
                  {new Date(item.dataPayed).toLocaleString()}
                </p>
              </div>
              <div className="booked-details__text-wrapper">
                <p className="booked-details__name-title">
                  Term policy accepted:
                </p>
                <p className="booked-details__value">
                  {item.agreePolicy ? (
                    <span className="booked-details__icon-ok">
                      <i className="far fa-check-square"></i>
                    </span>
                  ) : (
                    <span className="booked-details__icon-not-confirm">
                      <i className="fas fa-times"></i>
                    </span>
                  )}
                </p>
              </div>
              <h3 className="booked-details__booking-title">
                Service information:
              </h3>
              {item.services.map((item1, index) => (
                <Fragment key={index}>
                  <div className="booked-details__text-wrapper">
                    <p className="booked-details__name-title">
                      Hairdresser name:
                    </p>
                    <p className="booked-details__value">
                      {item.hairdresserName}
                    </p>
                  </div>
                  <div className="booked-details__text-wrapper">
                    <p className="booked-details__name-title">Service:</p>
                    <p className="booked-details__value">{item1.title}</p>
                  </div>
                  <div className="booked-details__text-wrapper">
                    <p className="booked-details__name-title">Price:</p>
                    <p className="booked-details__value">
                      {item1.price.toFixed(2)}€
                    </p>
                  </div>
                  <div className="booked-details__text-wrapper">
                    <p className="booked-details__name-title">Booking day:</p>
                    <p className="booked-details__value">
                      {new Date(item.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="booked-details__text-wrapper">
                    <p className="booked-details__name-title">Booking Time:</p>
                    <p className="booked-details__value">
                      {new Date(item.bookTime).toLocaleTimeString().slice(0, 5)}
                    </p>
                  </div>
                </Fragment>
              ))}
              <h3 className="booked-details__booking-title">
                Customer information:
              </h3>
              <div className="booked-details__text-wrapper">
                <p className="booked-details__name-title">Name:</p>
                <p className="booked-details__value">{item.name}</p>
              </div>
              <div className="booked-details__text-wrapper">
                <p className="booked-details__name-title">Email:</p>
                <p className="booked-details__value">{item.email}</p>
              </div>
              <div className="booked-details__text-wrapper">
                <p className="booked-details__name-title">Phone number:</p>
                <p className="booked-details__value">{item.phone}</p>
              </div>
              <h3 className="booked-details__booking-title">
                Summary information:
              </h3>
              <div className="booked-details__text-wrapper">
                <p className="booked-details__name-title">
                  Payment confirmation:
                </p>
                <p className="booked-details__value">
                  {item.isPayed ? (
                    <span className="booked-details__icon-ok">
                      <i className="far fa-check-square"></i>
                    </span>
                  ) : (
                    <span className="booked-details__icon-not-confirm">
                      <i className="fas fa-times"></i>
                    </span>
                  )}
                </p>
              </div>
              <div className="booked-details__text-wrapper">
                <p className="booked-details__name-title">
                  Total price with tax:
                </p>
                <p className="booked-details__value">
                  {item.totalPrice.toFixed(2)}€
                </p>
              </div>
            </Fragment>
          ))
        : null}
    </article>
  );
};

export default AdminBookedDetails;
