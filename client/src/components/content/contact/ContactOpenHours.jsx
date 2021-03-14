import React from "react";

import "./ContactOpenHours.scss";

const ContactOpenHours = () => {
  return (
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
  );
};

export default ContactOpenHours;
