import React from "react";
import * as Yup from "yup";

const useValidationShopForm = () => {
  const initialValues = {
    day: "",
    time: "",
  };

  const validationSchema = Yup.object({
    day: Yup.string().required("Day is required"),
    time: Yup.string().required("Time is required"),
  });

  return {
    initialValues,
    validationSchema,
  };
};

export default useValidationShopForm;
