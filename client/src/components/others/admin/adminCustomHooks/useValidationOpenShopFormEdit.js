import React from "react";
import * as Yup from "yup";

const useValidationOpenShopFormEdit = () => {
  const initialValues = {
    day: "",
    time: "",
  };

  const validationSchema = Yup.object({
    day: Yup.string().required("Title is required"),
    time: Yup.string().required("Price is required"),
  });

  return {
    initialValues,
    validationSchema,
  };
};

export default useValidationOpenShopFormEdit;
