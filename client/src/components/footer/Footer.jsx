import React from "react";

import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__wrapper">
        <div className="footer__logo">Hair planet</div>
        <div className="footer__media">
          <span className="footer__yt">
            <i className="fab fa-youtube"></i>
          </span>
          <span className="footer__tw">
            <i className="fab fa-twitter"></i>
          </span>
          <span className="footer__in">
            <i className="fab fa-instagram"></i>
          </span>
          <span className="footer__fb">
            <i className="fab fa-facebook-square"></i>
          </span>
        </div>
        <div className="footer__rights">All rights reserved@2021</div>
      </div>
    </footer>
  );
};

export default Footer;
