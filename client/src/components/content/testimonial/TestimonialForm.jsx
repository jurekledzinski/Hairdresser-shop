import React, { useEffect, useRef, useState } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  addServerErrorMessage,
  addServerSuccessMessage,
} from "../../../reduxStore/actions/actionAlertsMessages";

import { Formik, Form, Field, ErrorMessage } from "formik";

import "./TestimonialForm.scss";

import useValidationFormik from "./customTestimonialHooks/useValidationFormik";
import useRemoveErrorMessage from "./customTestimonialHooks/useRemoveErrorMessage";
import useHandleFile from "./customTestimonialHooks/useHandleFile";
import useFirebseDeleteFile from "../../../customHooks/useFirebaseDeleteFile";

import ErrorSuccessMessage from "../../others/errorSuccessMessages/ErrorSuccessMessages";
import ProgressBar from "../../others/progreeBar/ProgressBar";
import TestimonialStarRating from "./TestimonialStarRating";

import { addOpinion } from "../../../utils/sessions";

const TestimonialForm = () => {
  const {
    initialValues,
    validationSchema,
    validateRating,
  } = useValidationFormik();
  useRemoveErrorMessage();
  const { handleFile } = useHandleFile();

  const dispatch = useDispatch();
  const dataAlert = useSelector((store) => store.alertData);
  const dataFile = useSelector((store) => store.fileDate);
  const [nameFile, setNameFile] = useState(null);

  const rates = [1, 2, 3, 4, 5];

  const imgLink = useRef(null);

  useFirebseDeleteFile(imgLink);

  const onSubmit = async (values, submitProps) => {
    delete values.fileImg;

    values.imageUrl = imgLink.current;

    submitProps.resetForm();

    const { data, status } = await addOpinion(values);

    if (status !== 200) {
      dispatch(addServerErrorMessage(data.alert, "default"));
      setNameFile(null);
    } else {
      dispatch(addServerSuccessMessage(data.success, "default"));
      setNameFile(null);
    }
    imgLink.current = null;
  };

  const handleRating = (e, setFieldValue) => {
    const rate = parseInt(e.target.dataset.value);
    setFieldValue("rateStar", rate);
  };

  useEffect(() => {
    if (Boolean(dataFile.fileImageTestimonial)) {
      setNameFile(dataFile.fileImageTestimonial.name);
    }
  }, [dataFile]);

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
              {Boolean(dataFile.fileImageTestimonial) && (
                <ProgressBar imgLink={imgLink} />
              )}
              {!Boolean(Object.keys(formik.errors).length) &&
              dataAlert.errorServerMsg ? (
                <ErrorSuccessMessage />
              ) : (
                <ErrorSuccessMessage />
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
              <div className="testimonial__input-file-add">
                <label className="testimonial__label-file">
                  Choose File
                  <Field
                    as={inputFile}
                    name="fileImg"
                    type="file"
                    setFieldValue={formik.setFieldValue}
                    setFieldTouched={formik.setFieldTouched}
                  ></Field>
                </label>
                {nameFile ? (
                  <span className="testimonial__file-name">{nameFile}</span>
                ) : (
                  <span className="testimonial__file-name">No file ...</span>
                )}
              </div>
              <ErrorMessage name="opinion" component={errorMsg} />
              <Field
                as="textarea"
                className="testimonial__form-textarea"
                name="opinion"
                placeholder="Type in your opinion"
              />
              <button
                className="testimonial__form-button"
                type="submit"
                disabled={!formik.isValid}
              >
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
