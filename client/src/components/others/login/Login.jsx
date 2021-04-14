import React from "react";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import "./Login.scss";

import ButtonGoBackLoginRegister from "../buttonGoBackLoginRegister/ButtonGoBackLoginRegister";

const Login = () => {
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email required"),
    password: Yup.string().required("Password required"),
  });

  const onSubmit = (values, submitProps) => {
    console.log(values);
    console.log(submitProps);
    submitProps.resetForm();
  };

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
                <span className="login__cover-left"></span>
                <div className="login__left-redirects">
                  <h2 className="login__left-title">Log in</h2>
                  <p className="login__left-subtitle">
                    Please fill in your credentials to enter into admin
                    dashboard
                  </p>
                </div>
              </div>
              <div className="login__right">
                <h2 className="login__right-title">Log in</h2>
                <Form className="login__form">
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
