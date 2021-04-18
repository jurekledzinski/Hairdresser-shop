import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import "./HeaderRight.scss";

import { headerMenuLinks } from "./HeaderMenuLinks";

const HeaderRight = ({
  addRefs,
  isActiveLogo,
  isActiveHamburgerMenu,
  isActiveHeaderWrapper,
  isMobileMenuOpen,
  handleOpenAdminLogin,
  handleOpenCloseMobileMenu,
  handleScrollSectionAfterClickLink,
  navigationHeader,
  logoRef,
}) => {
  const menuOptions = headerMenuLinks.map((item, index) => {
    return (
      <li
        className={item.classItem}
        key={index}
        onClick={() => handleScrollSectionAfterClickLink(index)}
        ref={addRefs}
      >
        <Link className={item.classLink} to={item.pathName}>
          {item.nameLink}
        </Link>
      </li>
    );
  });

  return (
    <Fragment>
      <div
        className={
          isMobileMenuOpen
            ? "header__cover header__cover--active"
            : "header__cover"
        }
      ></div>
      <div
        className={
          isMobileMenuOpen && isActiveHeaderWrapper
            ? isMobileMenuOpen
              ? "header__wrapper header__wrapper--hide"
              : "header__wrapper"
            : isActiveHeaderWrapper
            ? "header__wrapper header__wrapper--active"
            : "header__wrapper"
        }
        ref={navigationHeader}
      >
        <div
          className={
            isMobileMenuOpen
              ? "header__logo--hide"
              : isActiveLogo
              ? "header__logo header__logo--active"
              : "header__logo"
          }
          ref={logoRef}
        >
          <span onClick={handleOpenAdminLogin}>Hair Planet</span>
        </div>
        <nav
          className={
            isMobileMenuOpen ? "header__nav header__nav--active" : "header__nav"
          }
        >
          <p className="header__logo-mobile-show">Hair Planet</p>
          <ul className="header__menu">
            {headerMenuLinks.map((item, index) => {
              return (
                <li
                  className={item.classItem}
                  key={index}
                  onClick={() => handleScrollSectionAfterClickLink(index)}
                  ref={addRefs}
                >
                  <Link className={item.classLink} to={item.pathName}>
                    {item.nameLink}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="header__menu-social-wrapper">
            <span className="header__menu-social-icon">
              <i className="fab fa-facebook-square"></i>
            </span>
            <span className="header__menu-social-icon">
              <i className="fab fa-instagram"></i>
            </span>
            <span className="header__menu-social-icon">
              <i className="fab fa-youtube-square"></i>
            </span>
            <span className="header__menu-social-icon">
              <i className="fab fa-twitter-square"></i>
            </span>
          </div>
        </nav>
        <div className="header__hamburger-wrapper">
          <div
            className={
              isActiveHamburgerMenu
                ? "header__hamburger header__hamburger--active"
                : "header__hamburger"
            }
            onClick={handleOpenCloseMobileMenu}
          >
            <span className="header__hamburger-line1"></span>
            <span className="header__hamburger-line2"></span>
            <span className="header__hamburger-line3"></span>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default HeaderRight;
