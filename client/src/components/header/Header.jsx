import React from "react";

import "./Header.scss";

const Header = () => {
  return (
    <header className="header">
      <div className="header__left"></div>
      <div className="header__right">
        <div className="header__cover"></div>
        <div className="header__wrapper">
          <div className="header__logo">Hair Planet</div>
          <nav className="header__nav">
            <ul className="header__menu">
              <li className="header__menu-item">Home</li>
              <li className="header__menu-item">Our team</li>
              <li className="header__menu-item">Gallery</li>
              <li className="header__menu-item">Testimonials</li>
              <li className="header__menu-item">Open Hours</li>
              <li className="header__menu-item">Contact</li>
            </ul>
          </nav>
          <div className="header__hamburger">
            <span className="header__hamburger-line1"></span>
            <span className="header__hamburger-line2"></span>
            <span className="header__hamburger-line3"></span>
          </div>
        </div>
      </div>
      <div className="header__main-titles">
        <h1 className="header__title">
          <span className="header__title-part-1">Welcome in</span> our barber
          shop
        </h1>
        <p className="header__subtitle">
          <span className="header__subtitle-part-1">an amazing barber </span>
          experience
        </p>
      </div>
      <span className="header__booking-button">Booking</span>
    </header>
  );
};

export default Header;
