import React from "react";
import * as Yup from "yup";

const useValidationFormikUpdateProfile = () => {
  const FILE_SIZE = 100 * 75;
  const FILE_FORMATS = ["image/png", "image/jpeg"];

  const initialValues = {
    name: "",
    lastName: "",
    email: "",
    fileImg: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    lastName: Yup.string().required("LastName is required"),
    email: Yup.string().email("Invalid email").required("Email required"),
    password: Yup.string().required("Password required"),
    confirmPassword: Yup.string().when("password", {
      is: (val) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref("password")],
        "Both passwords have to be the same"
      ),
    }),
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
    initialValues,
    validationSchema,
  };
};

export default useValidationFormikUpdateProfile;
