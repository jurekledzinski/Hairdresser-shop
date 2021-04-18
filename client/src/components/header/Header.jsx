import React, { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import {
  addSingleSection,
  clearSections,
} from "../../reduxStore/actions/actionScroll";
import {
  addLinksMenuHeader,
  removeLinksMenuHeader,
} from "../../reduxStore/actions/actionsHeader";

import "./Header.scss";

import HeaderRight from "./HeaderRight";
import HeaderTitle from "./HeaderTitle";
import Modal from "../others/modal/Modal";
import CircleSpinner from "../others/spinner/CircleSpinner";

import useMoveScroll from "./customHeaderHooks/useMoveScroll";
import useHandleScrollToSection from "./customHeaderHooks/useHandleScrollToSection";
import useSectionObserver from "./customHeaderHooks/useSectionObserver";

const Header = () => {
  const dispatch = useDispatch();
  const dataHeader = useSelector((store) => store.headerData);

  const [clickLogo, setClickLogo] = useState(0);
  const [isActiveHamburgerMenu, setIsActiveHamburgerMenu] = useState(false);
  const [isActiveHeaderWrapper, setIsActiveHeaderWrapper] = useState(false);
  const [isActiveLogo, setIsActiveLogo] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const idTimeout = useRef(null);
  const isMounted = useRef(null);
  const headerRef = useRef(null);
  const logoRef = useRef(null);
  const menuLinksRef = useRef([]);
  const navigationHeader = useRef(null);

  const history = useHistory();

  useMoveScroll(navigationHeader);
  const { handleScrollSectionAfterClickLink } = useHandleScrollToSection();
  useSectionObserver(
    headerRef,
    setIsActiveHeaderWrapper,
    setIsActiveHamburgerMenu,
    setIsActiveLogo
  );

  const addRefs = (element) => {
    if (element !== null && !dataHeader.includes(element)) {
      dispatch(addLinksMenuHeader(element));
      menuLinksRef.current = [...menuLinksRef.current, element];
    }
  };

  useEffect(() => {
    if (headerRef.current) {
      dispatch(addSingleSection(headerRef.current));
      menuLinksRef.current[0].childNodes[0].classList.add(
        "header__menu-link--active"
      );
    }
  }, []);

  const handleOpenCloseMobileMenu = () => {
    setIsMobileMenuOpen((prevValue) => !prevValue);
    setClickLogo(0);
  };

  const handleOpenAdminLogin = (e) => {
    setClickLogo((prevValue) => prevValue + 1);
  };

  useEffect(() => {
    if (clickLogo === 7) {
      setIsOpenModal(true);
      idTimeout.current = setTimeout(() => {
        history.push("/login-admin");
      }, 1700);
    }

    return () => clearTimeout(idTimeout.current);
  }, [clickLogo]);

  useEffect(() => {
    isMounted.current = true;
    return () => (isMounted.current = false);
  }, []);

  useEffect(() => {
    history.listen(() => {
      console.log(history, "history header");
      dispatch(removeLinksMenuHeader([]));
      dispatch(clearSections([]));
    });
  }, []);

  return (
    <Fragment>
      <header className="header" ref={headerRef}>
        <div className="header__left"></div>
        <div className="header__right">
          <HeaderRight
            addRefs={addRefs}
            isActiveLogo={isActiveLogo}
            isActiveHamburgerMenu={isActiveHamburgerMenu}
            isActiveHeaderWrapper={isActiveHeaderWrapper}
            isMobileMenuOpen={isMobileMenuOpen}
            handleOpenAdminLogin={handleOpenAdminLogin}
            handleOpenCloseMobileMenu={handleOpenCloseMobileMenu}
            handleScrollSectionAfterClickLink={
              handleScrollSectionAfterClickLink
            }
            navigationHeader={navigationHeader}
            logoRef={logoRef}
          />
        </div>
        <HeaderTitle />
        <Link className="header__booking-button" to="/booking">
          Booking
        </Link>
      </header>
      <Modal isOpen={isOpenModal}>
        <div className="header__redirect">
          <p className="header__redirect-text">Please wait</p>
          <p className="header__redirect-text">soon you will be redirect</p>
          <p className="header__redirect-text">to admin login page</p>
          <CircleSpinner />
        </div>
      </Modal>
    </Fragment>
  );
};

export default Header;
