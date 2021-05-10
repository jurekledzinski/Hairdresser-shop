import React from "react";
import * as Yup from "yup";

const useValidationServiceFormEdit = () => {
  const FILE_SIZE = 300 * 300;
  const FILE_FORMATS = ["image/png", "image/jpeg"];

  const initialValues = {
    fileImg: "",
    title: "",
    price: "",
  };

  const validationSchema = Yup.object({
    fileImg: Yup.mixed()
      .required("Image is required")
      .test(
        "fileSize",
        "Image is too large, use very small one",
        (value) => value && value.size <= FILE_SIZE
      )
      .test(
        "fileFormat",
        "Please use image type png or jpeg",
        (value) => value && FILE_FORMATS.includes(value.type)
      ),
    title: Yup.string().required("Title is required"),
    price: Yup.string().required("Price is required"),
  });

  return {
    initialValues,
    validationSchema,
  };
};

export default useValidationServiceFormEdit;
