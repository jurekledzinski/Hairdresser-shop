import React, { useEffect, useRef, useState } from "react";
import { useHistory, withRouter } from "react-router-dom";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import "./TestimonialForm.scss";

import { projectStorage } from "../../../firebase/config";

import ProgressBar from "../../others/progreeBar/ProgressBar";
import TestimonialStarRating from "./TestimonialStarRating";

const FILE_SIZE = 100 * 75;
const FILE_FORMATS = ["image/png", "image/jpeg"];

const initialValues = {
  name: "",
  opinion: "",
  rateStar: 0,
  fileImg: "",
};

const onSubmit = (values) => {
  console.log(values);
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

const TestimonialForm = () => {
  const [fileImage, setFileImage] = useState(null);

  const rates = [1, 2, 3, 4, 5];

  const imgLink = useRef(null);

  const history = useHistory();

  const handleRating = (e, setFieldValue) => {
    const rate = parseInt(e.target.dataset.value);
    setFieldValue("rateStar", rate);
  };

  useEffect(() => {
    history.listen(() => {
      const fireBaseUrlStorage = "firebasestorage";
      if (history.location.pathname !== "/" && Boolean(imgLink.current)) {
        if (
          Boolean(imgLink.current) &&
          imgLink.current.indexOf(fireBaseUrlStorage) !== -1
        ) {
          const image = projectStorage.refFromURL(imgLink.current);
          imgLink.current = null;
          image
            .delete()
            .then((responese) => responese)
            .catch((err) => {
              console.warn(err);
            });
        }
      }
    });
  }, [history.location.pathname, imgLink]);

  const handleFile = (e, callbackFile, callbackTouch) => {
    callbackTouch("fileImg");
    let selectFile = e.target.files[0];
    callbackFile("fileImg", selectFile);

    if (
      Boolean(selectFile) &&
      FILE_FORMATS.includes(selectFile.type) &&
      selectFile.size <= FILE_SIZE
    ) {
      setFileImage(selectFile);
    } else {
      setFileImage(null);
    }
  };

  const inputFile = ({ setFieldValue, setFieldTouched }) => (
    <input
      type="file"
      onChange={(e) => handleFile(e, setFieldValue, setFieldTouched)}
      className="testimonial__input-file"
    />
  );

  const errorMsg = (props) => {
    return <p className="testimonial__error-msg">{props.children}</p>;
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        return (
          <div className="testimonial__form">
            <Form
              className="testimonial__form-wrapper"
              onSubmit={formik.handleSubmit}
            >
              {Boolean(fileImage) && (
                <ProgressBar
                  fileImage={fileImage}
                  setFileImage={setFileImage}
                  imgLink={imgLink}
                />
              )}
              <ErrorMessage name="name" component={errorMsg} />
              <Field
                type="text"
                name="name"
                className="testimonial__form-input"
                placeholder="Name surname"
              />
              <ErrorMessage name="rateStar" component={errorMsg} />
              <div className="testimonial__form-rating">
                <label className="testimonial__add-rate">
                  Add rate:
                  <span className="testimonial__stars">
                    {rates.map((item) => (
                      <Field
                        name="rateStar"
                        type="number"
                        key={item}
                        validate={validateRating}
                      >
                        {({ field: { value }, form: { setFieldValue } }) => {
                          return (
                            <TestimonialStarRating
                              value={value}
                              item={item}
                              handleRating={(e) =>
                                handleRating(e, setFieldValue)
                              }
                            />
                          );
                        }}
                      </Field>
                    ))}
                  </span>
                </label>
              </div>
              <ErrorMessage name="fileImg" component={errorMsg} />
              <div className="testimonial__form-file">
                <Field
                  as={inputFile}
                  name="fileImg"
                  type="file"
                  setFieldValue={formik.setFieldValue}
                  setFieldTouched={formik.setFieldTouched}
                ></Field>
              </div>
              <ErrorMessage name="opinion" component={errorMsg} />
              <Field
                as="textarea"
                className="testimonial__form-textarea"
                name="opinion"
                placeholder="Type in your opinion"
              />
              <button className="testimonial__form-button" type="submit">
                Send
              </button>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
};

export default withRouter(TestimonialForm);
