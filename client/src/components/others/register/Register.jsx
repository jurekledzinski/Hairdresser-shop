import React from "react";
import { Link } from "react-router-dom";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import "./Register.scss";

import ButtonGoBackLoginRegister from "../buttonGoBackLoginRegister/ButtonGoBackLoginRegister";

const Register = () => {
  const initialValues = {
    name: "",
    lastName: "",
    email: "",
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
  });

  const onSubmit = (values, submitProps) => {
    console.log(values);
    console.log(submitProps);
    submitProps.resetForm();
  };

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

export default Register;
