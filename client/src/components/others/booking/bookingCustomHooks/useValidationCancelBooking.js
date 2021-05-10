import React from "react";
import * as Yup from "yup";

const useValidationAgreePolicy = () => {
  const initialValues = {
    cancelCode: "",
  };

  const validationSchema = Yup.object({
    cancelCode: Yup.string().required("Cancel code is required"),
  });

  return {
    initialValues,
    validationSchema,
  };
};

export default useValidationAgreePolicy;
