import React from "react";

import "./ContactLocation.scss";

import ContactGoogleMap from "./ContactGoogleMap";

const ContactLocation = () => {
  const location = {
    address: "Steenweg 11,Sittard,6131BB",
    lat: 50.999511,
    lng: 5.863546,
  };

  return (
    <div className="contact__location-wrapper">
      <h3 className="contact__find-title">Find us</h3>
      <div className="contact__address-map">
        <div className="contact__map">
          <ContactGoogleMap location={location} zoomLevel={17} />
        </div>
        <div className="contact__address">
          <p className="contact__name-shop">Hair Planet</p>
          <p className="contact__shop-street">Steenweg 11</p>
          <p className="contact__shop-post-code">6131 BB</p>
          <p className="contact__shop-country">The Netherlands</p>
        </div>
      </div>
    </div>
  );
};

export default ContactLocation;
