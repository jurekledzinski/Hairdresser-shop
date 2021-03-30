import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import { addSingleSection } from "../../../reduxStore/actions/actionScroll";

import "./Contact.scss";

import ContactOpenHours from "./ContactOpenHours";
import ContactImagesShop from "./ContactImagesShop";
import ContactForm from "./ContactForm";
import ContactLocation from "./ContactLocation";

const Contact = () => {
  const contactRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (contactRef.current) {
      dispatch(addSingleSection(contactRef.current));
    }
  }, []);

  return (
    <section className="contact" ref={contactRef}>
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
