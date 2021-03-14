import React from "react";

import "./Contact.scss";

import ContactOpenHours from "./ContactOpenHours";
import ContactImagesShop from "./ContactImagesShop";
import ContactForm from "./ContactForm";
import ContactLocation from "./ContactLocation";

const Contact = () => {
  return (
    <section className="contact">
      <div className="contact__left">
        <div className="contact__wrapper">
          <h2 className="contact__title">Open Hours</h2>
          <ContactOpenHours />
          <ContactImagesShop />
          <ContactForm />
          <ContactLocation />
        </div>
      </div>
      <div className="contact__right"></div>
    </section>
  );
};

export default Contact;
