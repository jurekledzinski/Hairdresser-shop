import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { headerMenuLinks } from "./HeaderMenuLinks";

import { addSingleSection } from "../../reduxStore/actions/actionScroll";

import "./Header.scss";

const Header = () => {
  const [isActiveHamburgerMenu, setIsActiveHamburgerMenu] = useState(false);
  const [isActiveHeaderWrapper, setIsActiveHeaderWrapper] = useState(false);
  const [isActiveLogo, setIsActiveLogo] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isMounted = useRef(null);
  const headerRef = useRef(null);
  const logoRef = useRef(null);
  const menuLinksRef = useRef([]);
  const navigationHeader = useRef(null);
  const dispatch = useDispatch();
  const dataForScrollAnimation = useSelector((store) => store.scrollData);

  const addRefs = (element) => {
    if (element !== null && !menuLinksRef.current.includes(element)) {
      menuLinksRef.current = [...menuLinksRef.current, element];
    }
  };

  const handleScrollSectionAfterClickLink = (index) => {
    if (menuLinksRef.current) {
      menuLinksRef.current.map((item, i) => {
        index === i
          ? item.childNodes[0].classList.add("header__menu-link--active")
          : item.childNodes[0].classList.remove("header__menu-link--active");
      });
    }

    const clickedSection = dataForScrollAnimation[index];

    window.scrollTo({
      top: isNaN((index * clickedSection.offsetTop) / index - 50)
        ? 0
        : (index * clickedSection.offsetTop) / index - 50,
      left: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (headerRef.current) {
      dispatch(addSingleSection(headerRef.current));
      menuLinksRef.current[0].childNodes[0].classList.add(
        "header__menu-link--active"
      );
    }
  }, []);

  const moveScroll = () => {
    if (
      dataForScrollAnimation.length > 0 &&
      Boolean(navigationHeader.current && Boolean(menuLinksRef.current))
    ) {
      dataForScrollAnimation.forEach((item, index) => {
        if (
          item.offsetTop - window.scrollY - 1 <
          -item.clientHeight + navigationHeader.current.clientHeight
        ) {
          menuLinksRef.current[index].childNodes[0].classList.remove(
            "header__menu-link--active"
          );
        } else if (
          window.scrollY + navigationHeader.current.clientHeight + 1 >
          item.offsetTop
        ) {
          menuLinksRef.current[index].childNodes[0].classList.add(
            "header__menu-link--active"
          );
        } else {
          menuLinksRef.current[index].childNodes[0].classList.remove(
            "header__menu-link--active"
          );
        }
      });
    }
  };

  const handleOpenCloseMobileMenu = () => {
    setIsMobileMenuOpen((prevValue) => !prevValue);
  };

  useEffect(() => {
    window.addEventListener("scroll", moveScroll);

    () => removeEventListener("scroll", moveScroll);
  }, [dataForScrollAnimation, navigationHeader.current, menuLinksRef.current]);

  useEffect(() => {
    const sectionOneOptions = {
      rootMargin: "-50% 0px 0px 0px",
    };

    const sectionOneObserver = new IntersectionObserver((entries) => {
      if (Boolean(isMounted.current)) {
        entries.forEach((item) => {
          if (item.isIntersecting) {
            setIsActiveHeaderWrapper(false);
            setIsActiveLogo(false);
            setIsActiveHamburgerMenu(false);
          } else {
            setIsActiveHeaderWrapper(true);
            setIsActiveLogo(true);
            setIsActiveHamburgerMenu(true);
          }
        });
      }
    }, sectionOneOptions);

    if (Boolean(headerRef.current)) {
      sectionOneObserver.observe(headerRef.current);
    }

    return () => {
      if (Boolean(headerRef.current))
        sectionOneObserver.unobserve(headerRef.current);
    };
  }, []);

  useEffect(() => {
    isMounted.current = true;
    return () => (isMounted.current = false);
  }, []);

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
    <header className="header" ref={headerRef}>
      <div className="header__left"></div>
      <div className="header__right">
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
            Hair Planet
          </div>
          <nav
            className={
              isMobileMenuOpen
                ? "header__nav header__nav--active"
                : "header__nav"
            }
          >
            <p className="header__logo-mobile-show">Hair Planet</p>
            <ul className="header__menu">{menuOptions}</ul>
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
      <Link className="header__booking-button" to="/booking">
        Booking
      </Link>
    </header>
  );
};

export default Header;
