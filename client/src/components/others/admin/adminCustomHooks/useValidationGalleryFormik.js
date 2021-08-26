import React from "react";
import * as Yup from "yup";

const useValidationGalleryFormik = () => {
  const FILE_SIZE = 640 * 480;
  const FILE_FORMATS = ["image/png", "image/jpeg"];

  const initialValues = {
    title: "",
    fileImg: "",
    type: "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
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

  return {
    FILE_SIZE,
    FILE_FORMATS,
    initialValues,
    validationSchema,
  };
};

export default useValidationGalleryFormik;
