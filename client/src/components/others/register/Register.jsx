import React, { useEffect, useRef } from "react";
import { Link, withRouter } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import {
  addImageFile,
  removeImageFile,
} from "../../../reduxStore/actions/actionFile";

import {
  addServerErrorMessage,
  addServerSuccessMessage,
  removeServerErrorMessage,
  removeServerSuccessMessage,
} from "../../../reduxStore/actions/actionAlertsMessages";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import "./Register.scss";

import { registerAdmin } from "../../../utils/sessions";

import ProgressBar from "../progreeBar/ProgressBar";
import ButtonGoBackLoginRegister from "../buttonGoBackLoginRegister/ButtonGoBackLoginRegister";

import useFirebseDeleteFile from "../../../customHooks/useFirebaseDeleteFile";

import ErrorSuccessMessage from "../../others/errorSuccessMessages/ErrorSuccessMessages";

const FILE_SIZE = 100 * 75;
const FILE_FORMATS = ["image/png", "image/jpeg"];

const Register = () => {
  const dispatch = useDispatch();
  const dataFile = useSelector((store) => store.fileDate);
  const dataAlert = useSelector((store) => store.alertData);

  const idTimeout = useRef(null);
  const imgLink = useRef(null);

  useFirebseDeleteFile(imgLink);

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

  const onSubmit = async (values, submitProps) => {
    delete values.fileImg;

    if (Boolean(imgLink.current)) {
      values.imageUrl = imgLink.current;
    }

    console.log(values);

    const { data, status } = await registerAdmin(values);
    console.log(data, status);

    if (status !== 200) {
      dispatch(addServerErrorMessage(data.alert, "registerForm"));
    } else {
      dispatch(addServerSuccessMessage(data.success, "registerForm"));
    }

    imgLink.current = null;
    submitProps.resetForm();
  };

  const handleFile = (e, callbackFile, callbackTouch) => {
    callbackTouch("fileImg");
    let selectFile = e.target.files[0];
    callbackFile("fileImg", selectFile);

    if (
      Boolean(selectFile) &&
      FILE_FORMATS.includes(selectFile.type) &&
      selectFile.size <= FILE_SIZE
    ) {
      dispatch(addImageFile(null, selectFile));
    } else {
      dispatch(removeImageFile(null, null));
    }
  };

  useEffect(() => {
    if (dataAlert.successServerMsg || dataAlert.errorServerMsg) {
      setTimeout(() => {
        idTimeout.current = dispatch(removeServerSuccessMessage(null, null));
        idTimeout.current = dispatch(removeServerErrorMessage(null, null));
      }, 1000);
    }

    return () => clearTimeout(idTimeout.current);
  }, [dataAlert.errorServerMsg, dataAlert.successServerMsg]);

  const inputFile = ({ setFieldValue, setFieldTouched }) => (
    <input
      type="file"
      onChange={(e) => handleFile(e, setFieldValue, setFieldTouched)}
      className="testimonial__input-file"
    />
  );

  const errorMsg = (props) => {
    return <p className="register__error-msg">{props.children}</p>;
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        console.log(formik);
        return (
          <section className="register">
            <div className="register__wrapper">
              <div className="register__left">
                <span className="login__cover-left"></span>
                <div className="register__left-redirects">
                  <h2 className="register__left-title">Sign up</h2>
                  <p className="register__left-subtitle">
                    Please fill in your details
                  </p>
                  <p className="register__left-login-text">
                    Already have an account?
                  </p>
                  <Link
                    className="register__left-login-button"
                    to="/login-admin"
                  >
                    Sign in
                  </Link>
                </div>
              </div>
              <div className="register__right">
                <ButtonGoBackLoginRegister />
                <h2 className="register__right-title">Sign Up</h2>
                <Form className="register__form">
                  {Boolean(dataFile.fileImageRegister) && (
                    <ProgressBar imgLink={imgLink} />
                  )}
                  {!Boolean(Object.keys(formik.errors).length) &&
                  dataAlert.errorServerMsg ? (
                    <ErrorSuccessMessage />
                  ) : (
                    <ErrorSuccessMessage />
                  )}
                  <div className="register__input-wrapper-name-surname">
                    <div className="register__wrapper-name">
                      <ErrorMessage name="name" component={errorMsg} />
                      <label className="register__label">First name</label>
                      <Field
                        className="register__input"
                        name="name"
                        type="text"
                        placeholder="Your name"
                      />
                      <span className="register__icon">
                        <i className="far fa-user"></i>
                      </span>
                    </div>
                    <div className="register__wrapper-surname">
                      <ErrorMessage name="lastName" component={errorMsg} />
                      <label className="register__label">Last name</label>
                      <Field
                        className="register__input"
                        name="lastName"
                        type="text"
                        placeholder="Your last name"
                      />
                      <span className="register__icon">
                        <i className="far fa-user"></i>
                      </span>
                    </div>
                  </div>

                  <div className="register__input-wrapper">
                    <ErrorMessage name="email" component={errorMsg} />
                    <label className="register__label">Email</label>
                    <Field
                      className="register__input"
                      name="email"
                      type="email"
                      placeholder="Your email"
                    />
                    <span className="register__icon">
                      <i className="far fa-envelope"></i>
                    </span>
                  </div>
                  <div className="register__input-wrapper">
                    <ErrorMessage name="fileImg" component={errorMsg} />
                    <Field
                      as={inputFile}
                      name="fileImg"
                      type="file"
                      setFieldValue={formik.setFieldValue}
                      setFieldTouched={formik.setFieldTouched}
                    ></Field>
                  </div>
                  <div className="register__input-wrapper">
                    <ErrorMessage name="password" component={errorMsg} />
                    <label className="register__label">Password</label>
                    <Field
                      className="register__input"
                      name="password"
                      type="text"
                      placeholder="Your password"
                    />
                    <span className="register__icon">
                      <i className="fas fa-lock"></i>
                    </span>
                  </div>
                  <div className="register__input-wrapper">
                    <ErrorMessage name="confirmPassword" component={errorMsg} />
                    <label className="register__label">Confirm Password</label>
                    <Field
                      className="register__input"
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirm password"
                    />
                    <span className="register__icon">
                      <i className="fas fa-eye"></i>
                    </span>
                  </div>
                  <button
                    className="register__button-register"
                    type="submit"
                    disabled={!formik.isValid}
                  >
                    Sign up
                  </button>
                </Form>
              </div>
            </div>
          </section>
        );
      }}
    </Formik>
  );
};

export default withRouter(Register);
