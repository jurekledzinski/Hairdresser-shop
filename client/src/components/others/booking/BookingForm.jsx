import React from "react";
import { useHistory } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import "./BookingForm.scss";

import BookingFormChooseHairDresser from "./BookingFormChooseHairDresser";
import BookingFormDayTime from "./BookingFormDayTime";
import BookingFormChooseService from "./BookingFormChooseService";
import BookingFormNameEmailPhone from "./BookingFormNameEmailPhone";

const BookingForm = () => {
  const history = useHistory();

  const initialValues = {
    hairdresserName: "",
    day: "",
    time: "",
    services: [],
    name: "",
    email: "",
    phone: "",
    cancelCode: "",
    isPayed: false,
    dataPayed: null,
    isCancel: false,
    dataCancel: null,
    bookingId: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, "Name is too short")
      .max(15, "Name is too long")
      .required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email required"),
    message: Yup.string()
      .min(100, "Please write a little more")
      .max(315, "Opininon is too long")
      .required("Opinion is required"),
  });

  const onSubmit = (values) => {
    console.log(values);
  };

  const errorMsg = (props) => {
    return <p className="contact__error-msg">{props.children}</p>;
  };

  const handleBookingForm = (e) => {
    e.preventDefault();
    const id = "123fkgsehddsfrt342dsf";
  };

  return (
    <form className="booking__form" onSubmit={handleBookingForm}>
      <BookingFormChooseHairDresser />
      <BookingFormDayTime />
      <BookingFormChooseService />
      <BookingFormNameEmailPhone />
      <button className="booking__button-continue">Continue</button>
    </form>
  );
};

export default BookingForm;
