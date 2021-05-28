import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";

import "./AdminAppointmentDetails.scss";

import { addServerErrorMessage } from "../../../../reduxStore/actions/actionAlertsMessages";
import { addBookedOrder } from "../../../../reduxStore/actions/actionBookedOrders";
import { increaseBookingMonthShop } from "../../../../reduxStore/actions/actionBookingsMadeAtShop";
import { increaseBookingMonthWebsite } from "../../../../reduxStore/actions/actionBookingsMadeAtWebsite";
import { increasePaymentsMonthShop } from "../../../../reduxStore/actions/actionPaymentsMonthShop";
import { increasePaymentsMonthWebsite } from "../../../../reduxStore/actions/actionPaymentsMonthWebsite";

import {
  addBooking,
  addExcludedDates,
  bookingConfirmCancelOrSuccess,
} from "../../../../utils/sessions";

import BookingPersonalDetails from "../../booking/BookingPersonalDetails";
import BookingDetailsSummary from "../../booking/BookingDetailsSummary";
import BookingOrderedServices from "../../booking/BookingOrderedServices";

import useValidationAgreePolicy from "../../booking/bookingCustomHooks/useValidationAgreePolicy";
import ErrorSuccessMessage from "../../../others/errorSuccessMessages/ErrorSuccessMessages";
import MessagePopup from "./AdminAppointmentMessagePopup";

const AdminAppointmentDetails = () => {
  const { initialValues, validationSchema } = useValidationAgreePolicy();
  const dispatch = useDispatch();
  const dataAlert = useSelector((store) => store.alertData);
  const dataDetailsOrder = useSelector((store) => store.orderDetailsData);
  const dataSingleExcludedTime = useSelector(
    (store) => store.singleExcludedTimeData
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const history = useHistory();

  const onSubmit = async (values, submitProps) => {
    let updateDetailsOrder = dataDetailsOrder;
    updateDetailsOrder.agreePolicy = values.agreePolicy;
    updateDetailsOrder.isPayed = true;
    const { data, status } = await addBooking(updateDetailsOrder);
    const [objExTime] = dataSingleExcludedTime;
    await addExcludedDates(objExTime);

    if (status === 200) {
      const details = {
        bookingId: data.bookingId,
        cancelCode: data.cancelCode,
        dateAppointment: data.date,
        email: data.email,
        hairdresserName: data.hairdresserName,
        name: data.name,
        services: data.services,
        totalPrice: data.totalPrice,
      };
      dispatch(addBookedOrder(data));
      await bookingConfirmCancelOrSuccess(details);
      setIsModalOpen(true);

      const indexMonthInTabel = new Date(data.dataPayed).getMonth();
      const placeBooking = data.bookingWhere;
      const priceOrder = data.totalPrice;

      switch (placeBooking) {
        case "Shop":
          dispatch(increaseBookingMonthShop(indexMonthInTabel));
          dispatch(increasePaymentsMonthShop(indexMonthInTabel, priceOrder));
          break;
        case "Website":
          dispatch(increaseBookingMonthWebsite(indexMonthInTabel));
          dispatch(increasePaymentsMonthWebsite(indexMonthInTabel, priceOrder));
        default:
          break;
      }
    } else {
      dispatch(addServerErrorMessage(error.message, "registerForm"));
    }

    submitProps.setSubmitting(false);
    submitProps.resetForm();
  };

  useEffect(() => {
    const item = sessionStorage.getItem("pageTwo");
    if (item) {
      history.push(`/admin/apponitments`);
    }
    sessionStorage.setItem("pageTwo", true);
  }, []);

  const handleGoBackToBooking = () => {
    history.push(`/admin/apponitments`);
  };

  const handleRedirect = () => {
    setIsModalOpen(false);
    history.push(`/admin/apponitments`);
  };

  const errorMsg = (props) => {
    return (
      <p className="admin-appointment-details__error-msg">{props.children}</p>
    );
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        return (
          <section className="admin-appointment-details">
            <div className="admin-appointment-details__center-wrapper">
              <button
                className="admin-appointment-details__button-go-back"
                onClick={handleGoBackToBooking}
              >
                Go back
              </button>
              <div className="admin-appointment-details__wrapper">
                <div className="admin-appointment-details__right">
                  <div className="admin-appointment-details__inside-wrapper">
                    <h3 className="admin-appointment-details__title">
                      Booking details
                    </h3>
                    <div className="admin-appointment-details__details">
                      <BookingPersonalDetails
                        adminPanelClassDetailsTitle="adminPanelClassDetailsTitle"
                        adminPanelClassPersonDetails="adminPanelClassPersonDetails"
                        adminPanelClassPersonText="adminPanelClassPersonText"
                        email={dataDetailsOrder.email}
                        date={dataDetailsOrder.date}
                        hairdresserName={dataDetailsOrder.hairdresserName}
                        name={dataDetailsOrder.name}
                        phone={dataDetailsOrder.phone}
                      />
                      <BookingOrderedServices
                        adminPanelClassDetailsTitle="adminPanelClassDetailsTitle"
                        adminPanelClassServiceName="adminPanelClassServiceName"
                        adminPanelClassServicePrice="adminPanelClassServicePrice"
                        adminPanelClassStyleScroll="adminPanelClassStyleScroll"
                        services={dataDetailsOrder.services}
                      />
                      <BookingDetailsSummary
                        adminPanelClassDetailsTitle="adminPanelClassDetailsTitle"
                        adminPanelClassTaxPriceTitle="adminPanelClassTaxPriceTitle"
                        adminPanelClassTaxPriceValue="adminPanelClassTaxPriceValue"
                        totalPrice={
                          Boolean(dataDetailsOrder.totalPrice) &&
                          dataDetailsOrder.totalPrice
                        }
                        subTotalPrice={dataDetailsOrder.subTotalPrice}
                      />

                      <Form className="admin-appointment-details__confirm-terms-shop">
                        {!Boolean(Object.keys(formik.errors).length) &&
                        dataAlert.errorServerMsg ? (
                          <ErrorSuccessMessage />
                        ) : (
                          <ErrorSuccessMessage />
                        )}
                        <ErrorMessage name="agreePolicy" component={errorMsg} />
                        <label
                          className="admin-appointment-details__confirm-terms"
                          htmlFor="agree"
                        >
                          <Field
                            name="agreePolicy"
                            className="admin-appointment-details__confirm-checkbox"
                            type="checkbox"
                            id="agree"
                          />
                          I agree with terms policy of Hair planet shop
                        </label>
                        <button
                          className="admin-appointment-details__button-checkout"
                          type="submit"
                          disabled={!formik.isValid}
                        >
                          Checkout
                        </button>
                      </Form>
                      <MessagePopup
                        isOpenModal={isModalOpen}
                        handleRedirect={handleRedirect}
                        messageTitle="Service is booked successfully"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      }}
    </Formik>
  );
};

export default AdminAppointmentDetails;
