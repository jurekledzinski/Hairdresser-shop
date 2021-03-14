import React from "react";

import "./ContactPinLocation.scss";

const ContactPinLocation = ({ text }) => {
  return (
    <div className="pin">
      <i className="fas fa-map-marker-alt"></i>
      <p className="pin__text">{text}</p>
    </div>
  );
};

export default ContactPinLocation;
