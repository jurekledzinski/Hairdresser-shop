import React, { useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";

import "./BookingCancelForm.scss";

import { cancelBookingByUser } from "../../../utils/sessions";

import { addServerErrorMessage } from "../../../reduxStore/actions/actionAlertsMessages";

import useValidationCancelBooking from "./bookingCustomHooks/useValidationCancelBooking";
import ErrorSuccessMessage from "../../others/errorSuccessMessages/ErrorSuccessMessages";

const BookingCancelForm = () => {
  const { initialValues, validationSchema } = useValidationCancelBooking();
  const dispatch = useDispatch();
  const dataAlert = useSelector((store) => store.alertData);

  const idTimeOut = useRef(null);
  const history = useHistory();

  const onSubmit = async (values, submitProps) => {
    const { data, status } = await cancelBookingByUser(values.codeCancel);

    if (status === 200) {
      idTimeOut.current = setTimeout(
        () => history.push(`/booking/cancel-code/${data.cancelCode}`),
        1000
      );
    } else {
      dispatch(addServerErrorMessage(data.alert, "default"));
    }

    submitProps.setSubmitting(false);
    submitProps.resetForm();
  };

  useEffect(() => {
    return () => clearTimeout(idTimeOut.current);
  }, []);

  const errorMessageCancel = (props) => {
    return <p className="booking__error-msg">{props.children}</p>;
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        console.log(formik);
        return (
          <div className="booking__cancel-wrapper">
            <Form className="booking__cancel-form">
              {!Boolean(Object.keys(formik.errors).length) &&
              dataAlert.errorServerMsg ? (
                <ErrorSuccessMessage />
              ) : (
                <ErrorSuccessMessage />
              )}
              <ErrorMessage name="codeCancel" component={errorMessageCancel} />
              <div className="booking__cancel-input-wrapper">
                <label className="booking__cancel-label">
                  Type in your code to cancel appointment
                </label>
                <Field
                  name="codeCancel"
                  className="booking__cancel-input"
                  type="text"
                />
              </div>
              <button
                className="booking__button-cancel"
                type="submit"
                disabled={!formik.isValid || formik.isSubmitting}
              >
                Cancel
              </button>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
};

export default BookingCancelForm;
