import React from "react";
import * as Yup from "yup";

const useValidationFormik = () => {
  const FILE_SIZE = 150 * 150;
  const FILE_FORMATS = ["image/png", "image/jpeg"];

  const initialValues = {
    name: "",
    opinion: "",
    rateStar: 0,
    fileImg: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(2, "Name is too short")
      .max(15, "Name is too long"),
    opinion: Yup.string()
      .min(100, "Please write a little more")
      .max(315, "Opininon is too long")
      .required("Opinion is required"),
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
  });

  const validateRating = (value) => {
    let error;
    if (!value) {
      error = "Rating is required";
    }
    return error;
  };

  return {
    FILE_SIZE,
    FILE_FORMATS,
    initialValues,
    validationSchema,
    validateRating,
  };
};

export default useValidationFormik;
