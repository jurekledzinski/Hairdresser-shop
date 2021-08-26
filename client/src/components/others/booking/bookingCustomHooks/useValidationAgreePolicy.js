import React from "react";
import * as Yup from "yup";

const useValidationAgreePolicy = () => {
  const initialValues = {
    agreePolicy: false,
  };

  const validationSchema = Yup.object({
    agreePolicy: Yup.bool().oneOf(
      [true],
      "Accept Terms & Conditions is required"
    ),
  });

  return {
    initialValues,
    validationSchema,
  };
};

export default useValidationAgreePolicy;
