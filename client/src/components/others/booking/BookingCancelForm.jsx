import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";

import "./BookingCancelForm.scss";

import {
  cancelBookingByUser,
  cancelBookingSendEmailUser,
  deleteExcludedDateCancelCode,
} from "../../../utils/sessions";

import { addServerErrorMessage } from "../../../reduxStore/actions/actionAlertsMessages";
import { addCanceledOrder } from "../../../reduxStore/actions/actionCanceledOrders";
import { removeBookedOrder } from "../../../reduxStore/actions/actionBookedOrders";

import useValidationCancelBooking from "./bookingCustomHooks/useValidationCancelBooking";
import ErrorSuccessMessage from "../../others/errorSuccessMessages/ErrorSuccessMessages";
import MessagePopup from "../admin/adminSubpages/AdminAppointmentMessagePopup";

const BookingCancelForm = ({
  adminPanelClassLabel,
  adminPanelClassInput,
  adminPanelRedirect,
}) => {
  const { initialValues, validationSchema } = useValidationCancelBooking();
  const dispatch = useDispatch();
  const dataAlert = useSelector((store) => store.alertData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageTitle, setMessageTitle] = useState("");

  const idTimeOut = useRef(null);
  const history = useHistory();

  const onSubmit = async (values, submitProps) => {
    const { data, status } = await cancelBookingByUser(values.codeCancel);

    console.log(data, status, " cancel booking admin panel");

    if (status === 200) {
      if (adminPanelRedirect === "adminPanelRedirect") {
        setIsModalOpen(true);
        setMessageTitle(data.success);
        dispatch(removeBookedOrder(data.dataOrder._id));
        dispatch(addCanceledOrder(data.dataOrder));
        await deleteExcludedDateCancelCode(data.cancelCode);
        await cancelBookingSendEmailUser(data.dataOrder);
      } else {
        idTimeOut.current = setTimeout(
          () => history.push(`/booking/cancel-code/${data.cancelCode}`),
          1000
        );
      }
    } else {
      dispatch(addServerErrorMessage(data.alert, "default"));
    }

    submitProps.setSubmitting(false);
    submitProps.resetForm();
  };

  const handleRedirect = () => {
    console.log("redirect to admin cancel booking");
    setIsModalOpen(false);
    history.push(`/admin/apponitments`);
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
                <label
                  className={
                    adminPanelClassLabel === "adminPanelClassLabel"
                      ? "booking__cancel-label--admin"
                      : "booking__cancel-label"
                  }
                >
                  Type in your code to cancel appointment
                </label>
                <Field
                  name="codeCancel"
                  className={
                    adminPanelClassInput === "adminPanelClassInput"
                      ? "booking__cancel-input--admin"
                      : "booking__cancel-input"
                  }
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
            <MessagePopup
              isOpenModal={isModalOpen}
              handleRedirect={handleRedirect}
              messageTitle={messageTitle}
            />
          </div>
        );
      }}
    </Formik>
  );
};

export default BookingCancelForm;
