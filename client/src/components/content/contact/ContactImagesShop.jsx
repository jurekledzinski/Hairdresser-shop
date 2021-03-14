import React from "react";

import "./ContactImagesShop.scss";

const ContactImagesShop = () => {
  return (
    <div className="contact__images-wrapper">
      <div className="contact__img-1">
        <picture>
          <source
            srcSet="https://firebasestorage.googleapis.com/v0/b/hairdress-shop.appspot.com/o/Hairdresser-outside-1-desktop.jpg?alt=media&token=61639856-13a6-40f3-ab60-98eb7b684126"
            media="(min-width: 768px)"
          />
          <img
            className="contact__img-one"
            src="https://firebasestorage.googleapis.com/v0/b/hairdress-shop.appspot.com/o/Hairplanet-outside-2-mobile.jpg?alt=media&token=67ce5877-186b-42da-b35e-17f732343ce7"
            alt="Entrance"
          />
        </picture>
      </div>
      <div className="contact__img-2">
        <div className="contact__img-first">
          <picture>
            <source
              srcSet="https://firebasestorage.googleapis.com/v0/b/hairdress-shop.appspot.com/o/Hairdressert-inside-2-desktop.jpg?alt=media&token=aa930ba1-02f1-4331-a6ea-5064dfe98fab"
              media="(min-width: 768px)"
            />
            <img
              className="contact__img-two"
              src="https://firebasestorage.googleapis.com/v0/b/hairdress-shop.appspot.com/o/Hairdressert-inside-2-mobile.jpg?alt=media&token=c1e3206a-16dd-415f-8ea8-b34f933b742d"
              alt="Inside hairdresser shop"
            />
          </picture>
        </div>
        <div className="contact__img-second">
          <picture>
            <source
              srcSet="https://firebasestorage.googleapis.com/v0/b/hairdress-shop.appspot.com/o/Hairdresser-inside-1-desktop.jpg?alt=media&token=c1c116bb-1245-44a7-bc47-8e1255646b8f"
              media="(min-width: 768px)"
            />
            <img
              className="contact__img-three"
              src="https://firebasestorage.googleapis.com/v0/b/hairdress-shop.appspot.com/o/Hairdresser-inside-1-mobile.jpg?alt=media&token=f9a57432-5910-4baa-821b-c69c22c44ec3"
              alt="Inside hairdresser shop"
            />
          </picture>
        </div>
      </div>
    </div>
  );
};

export default ContactImagesShop;
