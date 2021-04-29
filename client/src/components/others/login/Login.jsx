import React, { useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import "./Login.scss";

import {
  addServerErrorMessage,
  addServerSuccessMessage,
  removeServerErrorMessage,
  removeServerSuccessMessage,
} from "../../../reduxStore/actions/actionAlertsMessages";

import { loginAdmin } from "../../../utils/sessions";

import ErrorSuccessMessage from "../../others/errorSuccessMessages/ErrorSuccessMessages";

import ButtonGoBackLoginRegister from "../buttonGoBackLoginRegister/ButtonGoBackLoginRegister";

import useLoadBgImg from "../../../customHooks/useLoadBgImg";
import CircleSpinner from "../spinner/CircleSpinner";

const Login = () => {
  const dispatch = useDispatch();
  const dataAlert = useSelector((store) => store.alertData);
  const urlImgSignIn =
    "https://firebasestorage.googleapis.com/v0/b/hairdress-shop.appspot.com/o/Background-register.jpg?alt=media&token=1aaaebea-8a46-4dd2-bed2-f6b55509fb37";

  const isLoad = useLoadBgImg(urlImgSignIn);

  const flagSubmit = useRef(false);
  const idTimeoutSubmit = useRef(null);
  const idTimeout = useRef(null);
  const history = useHistory();

  console.log(flagSubmit.current);

  const initialValues = {
    email: "",
    password: "",
  };

  console.log("login");

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email required"),
    password: Yup.string().required("Password required"),
  });

  const onSubmit = async (values, submitProps) => {
    console.log(values);
    console.log(submitProps);

    const { data, status } = await loginAdmin(values);
    console.log(data, status);

    if (status !== 200) {
      dispatch(addServerErrorMessage(data.alert, "registerForm"));
    } else {
      dispatch(addServerSuccessMessage(data.success, "registerForm"));
      idTimeoutSubmit.current = true;
      flagSubmit.current = true;
    }

    submitProps.resetForm();
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

  useEffect(() => {
    if (flagSubmit.current) {
      idTimeoutSubmit.current = setTimeout(() => {
        history.push("/admin");
      }, 1100);
    }
    return () => clearTimeout(idTimeoutSubmit.current);
  }, [flagSubmit.current]);

  const errorMsg = (props) => {
    return <p className="login__error-msg">{props.children}</p>;
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
          <section className="login">
            <div className="login__wrapper">
              <ButtonGoBackLoginRegister />
              <div className="login__left">
                {!isLoad && (
                  <div className="login__overlay">
                    <CircleSpinner />
                  </div>
                )}
                <span className="login__cover-left"></span>
                {isLoad && (
                  <div className="login__left-redirects">
                    <h2 className="login__left-title">Log in</h2>
                    <p className="login__left-subtitle">
                      Please fill in your credentials to enter into admin
                      dashboard
                    </p>
                  </div>
                )}
              </div>
              <div className="login__right">
                <h2 className="login__right-title">Log in</h2>
                <Form className="login__form">
                  {!Boolean(Object.keys(formik.errors).length) &&
                  dataAlert.errorServerMsg ? (
                    <ErrorSuccessMessage />
                  ) : (
                    <ErrorSuccessMessage />
                  )}
                  <ErrorMessage name="email" component={errorMsg} />
                  <div className="login__input-wrapper">
                    <label className="login__label">Email</label>
                    <Field
                      className="login__input"
                      name="email"
                      type="email"
                      placeholder="Your email"
                    />
                    <span className="login__icon">
                      <i className="far fa-envelope"></i>
                    </span>
                  </div>
                  <ErrorMessage name="password" component={errorMsg} />
                  <div className="login__input-wrapper">
                    <label className="login__label">Password</label>
                    <Field
                      className="login__input"
                      name="password"
                      type="password"
                      placeholder="Your password"
                    />
                    <span className="login__icon">
                      <i className="fas fa-eye"></i>
                    </span>
                  </div>
                  <button
                    className="login__button-login"
                    type="submit"
                    disabled={!formik.isValid}
                  >
                    Log in
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

export default Login;
