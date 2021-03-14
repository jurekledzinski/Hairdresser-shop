import React from "react";

import "./ContactForm.scss";

const ContactForm = () => {
  return (
    <div className="contact__form-wrapper">
      <h3 className="contact__contact-title">Contact</h3>
      <p className="contact__contact-subtitle">
        If you have any question to ask, we will answer you as fast as possible.
      </p>
      <form className="contact__form">
        <input className="contact__input" type="text" />
        <input className="contact__input" type="email" />
        <textarea className="contact__textarea" cols="30" rows="10"></textarea>
        <button className="contact__button">Send</button>
      </form>
    </div>
  );
};

export default ContactForm;
