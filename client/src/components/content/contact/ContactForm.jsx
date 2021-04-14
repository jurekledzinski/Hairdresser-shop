import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import "./ContactForm.scss";

const ContactForm = () => {
  const initialValues = {
    name: "",
    email: "",
    message: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, "Name is too short")
      .max(15, "Name is too long")
      .required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email required"),
    message: Yup.string()
      .min(100, "Please write a little more")
      .max(315, "Opininon is too long")
      .required("Opinion is required"),
  });

  const onSubmit = (values, submitProps) => {
    console.log(values);
    console.log(submitProps);
    submitProps.resetForm();
  };

  const errorMsg = (props) => {
    return <p className="contact__error-msg">{props.children}</p>;
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
          <div className="contact__form-wrapper">
            <h3 className="contact__contact-title">Contact</h3>
            <p className="contact__contact-subtitle">
              If you have any question to ask, we will answer you as fast as
              possible.
            </p>

            <Form className="contact__form" onSubmit={formik.handleSubmit}>
              <ErrorMessage name="name" component={errorMsg} />
              <Field
                className="contact__input"
                name="name"
                placeholder="Name surname"
                type="text"
              />
              <ErrorMessage name="email" component={errorMsg} />
              <Field
                className="contact__input"
                name="email"
                type="email"
                placeholder="Your email"
              />
              <ErrorMessage name="message" component={errorMsg} />
              <Field
                as="textarea"
                className="contact__textarea"
                name="message"
                placeholder="Type in your message..."
              />
              <button
                className="contact__button"
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

export default ContactForm;
