import React from "react";
import * as Yup from "yup";

const useValidationCancelBooking = () => {
  const initialValues = {
    codeCancel: "",
  };

  const validationSchema = Yup.object({
    codeCancel: Yup.string().required("Cancel code is required"),
  });

  return {
    initialValues,
    validationSchema,
  };
};

export default useValidationCancelBooking;
