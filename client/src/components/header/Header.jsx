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
import { fetchPermissionToRegister } from "../../reduxStore/actions/actionFetchPermissionRegister";

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
  const dataPermission = useSelector((store) => store.permissionData);
  const { permission } = dataPermission;

  console.log(dataPermission, " dane permission ");

  const [checkPermission, setCheckPermission] = useState(true);
  const [clickLogo, setClickLogo] = useState(0);
  const [isActiveHamburgerMenu, setIsActiveHamburgerMenu] = useState(false);
  const [isActiveHeaderWrapper, setIsActiveHeaderWrapper] = useState(false);
  const [isActiveLogo, setIsActiveLogo] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [nameRedirect, setNameRedirect] = useState("register");

  const idTimeout = useRef(null);
  const isMounted = useRef(null);
  const headerRef = useRef(null);
  const logoRef = useRef(null);
  const menuLinksRef = useRef([]);
  const navigationHeader = useRef(null);

  const history = useHistory();

  console.log(checkPermission, "checkPermission ");

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
      switch (checkPermission) {
        case true:
          setNameRedirect("register");
          idTimeout.current = setTimeout(() => {
            history.push("/register-admin");
          }, 1700);
          break;
        case false:
          setNameRedirect("login");
          idTimeout.current = setTimeout(() => {
            history.push("/login-admin");
          }, 1700);
          break;
        default:
          setNameRedirect("home");
          idTimeout.current = setTimeout(() => {
            history.push("/");
          }, 1700);
          break;
      }
    }

    return () => clearTimeout(idTimeout.current);
  }, [clickLogo]);

  useEffect(() => {
    isMounted.current = true;
    return () => (isMounted.current = false);
  }, []);

  useEffect(() => {
    history.listen(() => {
      dispatch(removeLinksMenuHeader([]));
      dispatch(clearSections([]));
    });
  }, []);

  useEffect(() => {
    dispatch(fetchPermissionToRegister());
  }, []);

  useEffect(() => {
    if (permission.length > 0) {
      const [checkEnable] = permission;
      setCheckPermission(checkEnable.enableRegisterForm);
    }
  }, [permission]);

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
          <p className="header__redirect-text">to admin {nameRedirect} page</p>
          <CircleSpinner />
        </div>
      </Modal>
    </Fragment>
  );
};

export default Header;
