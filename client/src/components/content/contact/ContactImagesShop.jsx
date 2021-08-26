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
            src="https://firebasestorage.googleapis.com/v0/b/hairdress-shop.appspot.com/o/Hairplanet-outside-2-mobile.jpg?alt=media&token=0a5d7553-3d6e-4bef-ac62-d43b3804278a"
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
              src="https://firebasestorage.googleapis.com/v0/b/hairdress-shop.appspot.com/o/Hairdressert-inside-2-mobile.jpg?alt=media&token=2696720b-1252-4cd2-b769-c101c97089c0"
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
              src="https://firebasestorage.googleapis.com/v0/b/hairdress-shop.appspot.com/o/Hairdresser-inside-1-mobile.jpg?alt=media&token=1f85925a-873f-4aa0-9150-b50262b7e915"
              alt="Inside hairdresser shop"
            />
          </picture>
        </div>
      </div>
    </div>
  );
};

export default ContactImagesShop;
