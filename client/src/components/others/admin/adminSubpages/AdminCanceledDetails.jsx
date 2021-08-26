import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import "./AdminCanceledDetails.scss";

const AdminCanceledDetails = () => {
  const idParams = useParams();
  const dataCanceledOrdersToUse = useSelector(
    (store) => store.canceledOrderData
  );
  const [dataCanceled, setDataCanceled] = useState(null);

  useEffect(() => {
    if (dataCanceledOrdersToUse.length > 0) {
      const currentOrder = dataCanceledOrdersToUse.filter(
        (item) => item._id === idParams.id
      );

      setDataCanceled(currentOrder);
    }
  }, [dataCanceledOrdersToUse]);

  return (
    <article className="canceled-details">
      {dataCanceled !== null
        ? dataCanceled.map((item, index) => (
            <Fragment key={index}>
              <h3 className="canceled-details__booking-title">
                Booking information
              </h3>
              <div className="canceled-details__text-wrapper">
                <p className="canceled-details__name-title">Booking ID:</p>
                <p className="canceled-details__value">{item.bookingId}</p>
              </div>
              <div className="canceled-details__text-wrapper">
                <p className="canceled-details__name-title">Booking day:</p>
                <p className="canceled-details__value">
                  {new Date(item.date).toLocaleDateString()}
                </p>
              </div>
              <div className="canceled-details__text-wrapper">
                <p className="canceled-details__name-title">Booking Time:</p>
                <p className="canceled-details__value">
                  {new Date(item.bookTime).toLocaleTimeString().slice(0, 5)}
                </p>
              </div>
              <div className="canceled-details__text-wrapper">
                <p className="canceled-details__name-title">Place booking:</p>
                <p className="canceled-details__value">{item.bookingWhere}</p>
              </div>
              <div className="canceled-details__text-wrapper">
                <p className="canceled-details__name-title">Date payment:</p>
                <p className="canceled-details__value">
                  {new Date(item.dataPayed).toLocaleString()}
                </p>
              </div>
              <div className="canceled-details__text-wrapper">
                <p className="canceled-details__name-title">
                  Term policy accepted:
                </p>
                <p className="canceled-details__value">
                  {item.agreePolicy ? (
                    <span className="canceled-details__icon-ok">
                      <i className="far fa-check-square"></i>
                    </span>
                  ) : (
                    <span className="canceled-details__icon-not-confirm">
                      <i className="fas fa-times"></i>
                    </span>
                  )}
                </p>
              </div>
              <h3 className="canceled-details__booking-title">
                Cancel information
              </h3>
              <div className="canceled-details__text-wrapper">
                <p className="canceled-details__name-title">Cancel code:</p>
                <p className="canceled-details__value">{item.cancelCode}</p>
              </div>
              <div className="canceled-details__text-wrapper">
                <p className="canceled-details__name-title">Cancel date:</p>
                <p className="canceled-details__value">
                  {new Date(item.dataCancel).toLocaleString()}
                </p>
              </div>
              <div className="canceled-details__text-wrapper">
                <p className="canceled-details__name-title">
                  Cancel confirmation:
                </p>
                <p className="canceled-details__value">
                  {item.isCancel ? (
                    <span className="canceled-details__icon-ok">
                      <i className="far fa-check-square"></i>
                    </span>
                  ) : (
                    <span className="canceled-details__icon-not-confirm">
                      <i className="fas fa-times"></i>
                    </span>
                  )}
                </p>
              </div>
              <div className="canceled-details__text-wrapper">
                <p className="canceled-details__name-title">
                  Amount to return:
                </p>
                <p className="canceled-details__value">
                  {item.cancelPaymentReturnPercent}
                </p>
              </div>
              <h3 className="canceled-details__booking-title">
                Service information:
              </h3>
              {item.services.map((item1, index) => (
                <Fragment key={index}>
                  <div className="canceled-details__text-wrapper">
                    <p className="canceled-details__name-title">
                      Hairdresser name:
                    </p>
                    <p className="canceled-details__value">
                      {item.hairdresserName}
                    </p>
                  </div>
                  <div className="canceled-details__text-wrapper">
                    <p className="canceled-details__name-title">Service:</p>
                    <p className="canceled-details__value">{item1.title}</p>
                  </div>
                  <div className="canceled-details__text-wrapper">
                    <p className="canceled-details__name-title">Price:</p>
                    <p className="canceled-details__value">
                      {item1.price.toFixed(2)}€
                    </p>
                  </div>
                  <div className="canceled-details__text-wrapper">
                    <p className="canceled-details__name-title">Booking day:</p>
                    <p className="canceled-details__value">
                      {new Date(item.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="canceled-details__text-wrapper">
                    <p className="canceled-details__name-title">
                      Booking Time:
                    </p>
                    <p className="canceled-details__value">
                      {new Date(item.bookTime).toLocaleTimeString().slice(0, 5)}
                    </p>
                  </div>
                </Fragment>
              ))}
              <h3 className="canceled-details__booking-title">
                Customer information:
              </h3>
              <div className="canceled-details__text-wrapper">
                <p className="canceled-details__name-title">Name:</p>
                <p className="canceled-details__value">{item.name}</p>
              </div>
              <div className="canceled-details__text-wrapper">
                <p className="canceled-details__name-title">Email:</p>
                <p className="canceled-details__value">{item.email}</p>
              </div>
              <div className="canceled-details__text-wrapper">
                <p className="canceled-details__name-title">Phone number:</p>
                <p className="canceled-details__value">{item.phone}</p>
              </div>
              <h3 className="canceled-details__booking-title">
                Summary information:
              </h3>
              <div className="canceled-details__text-wrapper">
                <p className="canceled-details__name-title">
                  Payment confirmation:
                </p>
                <p className="canceled-details__value">
                  {item.isPayed ? (
                    <span className="canceled-details__icon-ok">
                      <i className="far fa-check-square"></i>
                    </span>
                  ) : (
                    <span className="canceled-details__icon-not-confirm">
                      <i className="fas fa-times"></i>
                    </span>
                  )}
                </p>
              </div>
              <div className="canceled-details__text-wrapper">
                <p className="canceled-details__name-title">
                  Total price with tax:
                </p>
                <p className="canceled-details__value">
                  {item.totalPrice.toFixed(2)}€
                </p>
              </div>
            </Fragment>
          ))
        : null}
    </article>
  );
};

export default AdminCanceledDetails;
