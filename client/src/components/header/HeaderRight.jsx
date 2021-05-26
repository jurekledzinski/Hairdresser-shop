import React, { Fragment, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  clearAdminLogOut,
  fetchUsers,
} from "../../reduxStore/actions/actionFetchAdmin";
import { clearAdminData } from "../../reduxStore/actions/actionAdminData";
import { clearFetchedOrdersBooked } from "../../reduxStore/actions/actionFetchBookedOrders";
import { clearFetchCanceledOrders } from "../../reduxStore/actions/actionFetchCanceledOrders";
import { clearBookedOrder } from "../../reduxStore/actions/actionBookedOrders";
import { clearCanceledOrder } from "../../reduxStore/actions/actionCanceledOrders";
import { clearFetchBookingAmountMonthShop } from "../../reduxStore/actions/actionFetchAmountBookingsPerMonthInShop";
import { clearBookingMonthShop } from "../../reduxStore/actions/actionBookingsMadeAtShop";
import { clearFetchBookingsMonthWebsite } from "../../reduxStore/actions/actionFetchAmountBookingsPerMonthInWebsite";
import { clearBookingMonthWebsite } from "../../reduxStore/actions/actionBookingsMadeAtWebsite";
import { clearFetchPaymentsMonthShop } from "../../reduxStore/actions/actionFetchPaymentsMonthShop";
import { clearFetchPaymentsMonthWebsite } from "../../reduxStore/actions/actionFetchPaymentsMonthWebsite";
import { clearPaymentsMonthShop } from "../../reduxStore/actions/actionPaymentsMonthShop";
import { clearPaymentsMonthWebsite } from "../../reduxStore/actions/actionPaymentsMonthWebsite";
import { clearFetchEmails } from "../../reduxStore/actions/actionFetchEmails";
import { clearEmailData } from "../../reduxStore/actions/actionEmailsData";
import { clearFetchOpinions } from "../../reduxStore/actions/actionFetchOpinions";
import { clearOpinionData } from "../../reduxStore/actions/actionOpinionsData";
import { clearFetchImagesGallery } from "../../reduxStore/actions/actionFetchGalleryImages";
import { clearImageFile } from "../../reduxStore/actions/actionFile";
import { clearFetchPermissionRegister } from "../../reduxStore/actions/actionFetchPermissionRegister";
import { clearFetchRegisterAdmins } from "../../reduxStore/actions/actionFetchRegisteredAdmins";
import { clearFetchServices } from "../../reduxStore/actions/actionFetchServices";
import { clearFetchShopOpen } from "../../reduxStore/actions/actionFetchOpenShop";

import { logoutAdmin } from "../../utils/sessions";

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
  const dispatch = useDispatch();
  const dataUser = useSelector((store) => store.userData);
  const { users } = dataUser;
  const [islogAdmin, setIsLogAdmin] = useState(null);
  const [logOutMsg, setLogOutMsg] = useState(null);
  const idTimeOut = useRef(null);

  const handleLogoutMainPage = async () => {
    const { data, status } = await logoutAdmin();
    if (status === 200) {
      setLogOutMsg(data.success);
    } else {
      setLogOutMsg(data.alert);
    }
    dispatch(clearAdminLogOut());
    dispatch(clearAdminData());
    dispatch(clearFetchedOrdersBooked());
    dispatch(clearFetchCanceledOrders());
    dispatch(clearBookedOrder());
    dispatch(clearCanceledOrder());
    dispatch(clearFetchBookingAmountMonthShop());
    dispatch(clearBookingMonthShop());
    dispatch(clearFetchBookingsMonthWebsite());
    dispatch(clearBookingMonthWebsite());
    dispatch(clearFetchPaymentsMonthShop());
    dispatch(clearFetchPaymentsMonthWebsite());
    dispatch(clearPaymentsMonthShop());
    dispatch(clearPaymentsMonthWebsite());
    dispatch(clearFetchEmails());
    dispatch(clearEmailData());
    dispatch(clearFetchOpinions());
    dispatch(clearOpinionData());
    dispatch(clearFetchImagesGallery());
    dispatch(clearImageFile());
    dispatch(clearFetchPermissionRegister());
    dispatch(clearFetchRegisterAdmins());
    dispatch(clearFetchServices());
    dispatch(clearFetchShopOpen());
    idTimeOut.current = setTimeout(() => {
      setIsLogAdmin(null);
      setLogOutMsg(null);
    }, 1000);
  };

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    if (!Array.isArray(users) && typeof users === "object") {
      setIsLogAdmin(users);
    }
  }, [users]);

  useEffect(() => {
    return () => clearTimeout(idTimeOut.current);
  }, []);

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
          {logOutMsg && (
            <p
              className={
                logOutMsg === "You are log out"
                  ? "header__logout-message"
                  : "header__logout-message--alert"
              }
            >
              {logOutMsg}
            </p>
          )}
          <p className="header__logo-mobile-show">Hair Planet</p>
          <ul className="header__menu">
            {Boolean(islogAdmin) && islogAdmin.role === "Super Admin" && (
              <li className="header__menu-item">
                <button
                  className="header__menu-link header__menu-link--logout"
                  onClick={handleLogoutMainPage}
                >
                  Log out
                </button>
              </li>
            )}
            {Boolean(islogAdmin) && islogAdmin.role === "Super Admin" && (
              <li className="header__menu-item">
                <Link
                  className={
                    Boolean(islogAdmin) &&
                    islogAdmin.role === "Super Admin" &&
                    "header__menu-link header__menu-link--admin"
                  }
                  to="/admin"
                >
                  Admin
                </Link>
              </li>
            )}
            {Boolean(islogAdmin) && islogAdmin.role === "Admin" && (
              <li className="header__menu-item">
                <Link
                  className={
                    Boolean(islogAdmin) &&
                    islogAdmin.role === "Admin" &&
                    "header__menu-link header__menu-link--admin"
                  }
                  to="/admin"
                >
                  Admin
                </Link>
              </li>
            )}
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
