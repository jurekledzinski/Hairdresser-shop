import React from "react";

import "./Contact.scss";

const Contact = () => {
  return (
    <section className="contact">
      <div className="contact__left">
        <div className="contact__wrapper">
          <h2 className="contact__title">Open Hours</h2>
          <div className="contact__hours-wrapper">
            <div className="contact__day-of-week">
              <p className="contact__day">Monday</p>
              <p className="contact__day">Thusday</p>
              <p className="contact__day">Wednesday</p>
              <p className="contact__day">Thursday</p>
              <p className="contact__day">Friday</p>
              <p className="contact__day">Saturday</p>
              <p className="contact__day">Sunday</p>
            </div>
            <div className="contact__time">
              <p className="contact__time">Closed</p>
              <p className="contact__time">10a.m. - 7p.m.</p>
              <p className="contact__time">10a.m. - 7p.m.</p>
              <p className="contact__time">10a.m. - 7p.m.</p>
              <p className="contact__time">10a.m. - 7p.m.</p>
              <p className="contact__time">10a.m. - 3p.m.</p>
              <p className="contact__time">Closed</p>
            </div>
          </div>
          <div className="contact__images-wrapper">
            <div className="contact__img-1">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/hairdress-shop.appspot.com/o/hairplanet-outside-desktop.jpg?alt=media&token=c4f7a946-ad56-4dac-a13a-08cdfa3e84d5"
                alt="Hairplanet entrance"
              />
            </div>
            <div className="contact__img-2">
              <div className="contact__img-first"></div>
              <div className="contact__img-second">Second img</div>
            </div>
          </div>
          <div className="contact__form-wrapper">
            <h3 className="contact__contact-title">Contact</h3>
            <p className="contact__contact-subtitle">
              If you have any question to ask, we will answer you as fast as
              possible.
            </p>
            <form className="contact__form">
              <input className="contact__input" type="text" />
              <input className="contact__input" type="email" />
              <textarea
                className="contact__textarea"
                cols="30"
                rows="10"
              ></textarea>
              <button className="contact__button">Send</button>
            </form>
          </div>
          <div className="contact__location-wrapper">
            <h3 className="contact__find-title">Find us</h3>
            <div className="contact__address-map">
              <div className="contact__map"></div>
              <div className="contact__address"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="contact__right"></div>
    </section>
  );
};

export default Contact;
