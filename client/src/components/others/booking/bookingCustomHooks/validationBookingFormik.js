import React from "react";
import * as Yup from "yup";

const useValidationFormikUpdateProfile = () => {
  const initialValues = {
    hairdresserName: "",
    date: "",
    services: [],
    name: "",
    email: "",
    phone: "",
    cancelCode: "",
    isPayed: false,
    dataPayed: "",
    isCancel: false,
    dataCancel: "",
    bookingId: "",
  };

  const validationSchema = Yup.object({
    hairdresserName: Yup.string().required("Hairdresser name is required"),
    services: Yup.array().min(1, "Service is required"),
    name: Yup.string()
      .min(2, "Name is too short")
      .max(15, "Name is too long")
      .required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string().required("Phone number is required"),
    date: Yup.date().required("Date and time is required").nullable(),
  });

  return {
    initialValues,
    validationSchema,
  };
};

export default useValidationFormikUpdateProfile;
