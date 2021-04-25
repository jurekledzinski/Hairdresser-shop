import React from "react";
import * as Yup from "yup";

const useValidationServiceFormEdit = () => {
  const initialValues = {
    title: "",
    price: "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    price: Yup.string().required("Price is required"),
  });

  return {
    initialValues,
    validationSchema,
  };
};

export default useValidationServiceFormEdit;
