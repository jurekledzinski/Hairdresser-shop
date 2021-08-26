import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { loadStripe } from "@stripe/stripe-js/pure";

import "./BookingDetails.scss";

import { addServerErrorMessage } from "../../../reduxStore/actions/actionAlertsMessages";

import {
  addBooking,
  addExcludedDates,
  collectPay,
} from "../../../utils/sessions";

import BookingPersonalDetails from "./BookingPersonalDetails";
import BookingDetailsSummary from "./BookingDetailsSummary";
import BookingOrderedServices from "./BookingOrderedServices";

import useValidationAgreePolicy from "./bookingCustomHooks/useValidationAgreePolicy";
import ErrorSuccessMessage from "../../others/errorSuccessMessages/ErrorSuccessMessages";

const BookingDetails = () => {
  const { initialValues, validationSchema } = useValidationAgreePolicy();
  const dispatch = useDispatch();
  const dataAlert = useSelector((store) => store.alertData);
  const dataDetailsOrder = useSelector((store) => store.orderDetailsData);
  const dataSingleExcludedTime = useSelector(
    (store) => store.singleExcludedTimeData
  );
  const [stripe, setStripe] = useState(null);

  const history = useHistory();

  const onSubmit = async (values, submitProps) => {
    let updateDetailsOrder = dataDetailsOrder;
    updateDetailsOrder.agreePolicy = values.agreePolicy;
    await addBooking(updateDetailsOrder);
    const [objExTime] = dataSingleExcludedTime;
    await addExcludedDates(objExTime);

    const stripeData = {
      bookingId: dataDetailsOrder.bookingId,
      services: dataDetailsOrder.services,
    };

    const { data, status } = await collectPay(stripeData);

    if (status === 200) {
      const { error } = await stripe.redirectToCheckout({
        sessionId: data.sessionId,
      });

      if (error.message) {
        dispatch(addServerErrorMessage(error.message, "registerForm"));
      }
    }

    submitProps.setSubmitting(false);
    submitProps.resetForm();
  };

  useEffect(() => {
    const item = sessionStorage.getItem("page");
    if (item) {
      history.push("/booking");
    }
    sessionStorage.setItem("page", true);
  }, []);

  const loadingStripe = async () => {
    const stripe = await loadStripe(
      "pk_test_51HK927EW1gldDKWc0QVK2ehsteG1SDRe8BPAhkbCbIKfwFJPMbqiBeKGtbihghlcC6TphYpeLZfrPdy7wo3100a7008JnQvZi1"
    );
    setStripe(stripe);
  };

  useEffect(() => {
    loadingStripe();
  }, []);

  const handleGoBackToBooking = () => {
    history.push(`/booking`);
  };

  const errorMsg = (props) => {
    return <p className="booking__error-msg">{props.children}</p>;
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        return (
          <section className="bookingDetails">
            <div className="bookingDetails__center-wrapper">
              <button
                className="booking__button-go-back"
                onClick={handleGoBackToBooking}
              >
                Go back
              </button>
              <div className="bookingDetails__wrapper">
                <div className="bookingDetails__left"></div>
                <div className="bookingDetails__right">
                  <div className="bookingDetails__inside-wrapper">
                    <h2 className="bookingDetails__title">Booking details</h2>
                    <div className="bookingDetails__details">
                      <BookingPersonalDetails
                        email={dataDetailsOrder.email}
                        date={dataDetailsOrder.date}
                        hairdresserName={dataDetailsOrder.hairdresserName}
                        name={dataDetailsOrder.name}
                        phone={dataDetailsOrder.phone}
                      />
                      <BookingOrderedServices
                        services={dataDetailsOrder.services}
                      />
                      <BookingDetailsSummary
                        totalPrice={
                          Boolean(dataDetailsOrder.totalPrice) &&
                          dataDetailsOrder.totalPrice
                        }
                        subTotalPrice={dataDetailsOrder.subTotalPrice}
                      />

                      <Form className="bookingDetails__confirm-terms-shop">
                        {!Boolean(Object.keys(formik.errors).length) &&
                        dataAlert.errorServerMsg ? (
                          <ErrorSuccessMessage />
                        ) : (
                          <ErrorSuccessMessage />
                        )}
                        <ErrorMessage name="agreePolicy" component={errorMsg} />
                        <label
                          className="bookingDetails__confirm-terms"
                          htmlFor="agree"
                        >
                          <Field
                            name="agreePolicy"
                            className="bookingDetails__confirm-checkbox"
                            type="checkbox"
                            id="agree"
                          />
                          I agree with terms policy of Hair planet shop
                        </label>
                        <button
                          className="bookingDetails__button-checkout"
                          type="submit"
                          disabled={!formik.isValid}
                        >
                          Checkout
                        </button>
                      </Form>
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

export default BookingDetails;
