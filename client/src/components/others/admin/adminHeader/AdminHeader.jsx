import React from "react";
import { useHistory } from "react-router-dom";

import "./AdminHeader.scss";

import CircleSpinner from "../../spinner/CircleSpinner";

const AdminHeader = ({
  handleCloseOpenMenu,
  handleLogout,
  isOpenMenu,
  loadImg,
  users,
}) => {
  const history = useHistory();
  let currentUrl = history.location.pathname;
  const sectionAdmin = currentUrl.slice(7);
  let sectionDetails = currentUrl.slice(7);
  let indexSign = sectionDetails.indexOf("/");
  let changeToName = sectionDetails.slice(0, indexSign);
  let nameSection = changeToName.replace("-", " ").replace("-", " ");
  const newNameSection =
    nameSection.charAt(0).toUpperCase() + nameSection.slice(1);

  return (
    <header
      className={isOpenMenu ? "admin__right-nav--active" : "admin__right-nav"}
    >
      <div className="admin__nav-left">
        <div className="admin__extra-logo">Hp</div>
        <div
          className={
            isOpenMenu
              ? "admin__hamburger-wrapper admin__hamburger-wrapper--active"
              : "admin__hamburger-wrapper"
          }
        >
          <div className="admin__hamburger-menu" onClick={handleCloseOpenMenu}>
            <span className="admin__hamburger-line"></span>
            <span className="admin__hamburger-line"></span>
            <span className="admin__hamburger-line"></span>
          </div>
        </div>
        <h4
          className={
            sectionAdmin.indexOf("details-appointment") !== -1
              ? "admin__menu-option-name admin__menu-option-name--hide-mobile"
              : "admin__menu-option-name"
          }
        >
          {currentUrl !== "/admin"
            ? sectionAdmin.indexOf("details") !== -1
              ? newNameSection
              : sectionAdmin
            : "Dashboard"}
        </h4>
      </div>
      <div className="admin__nav-right">
        <div className="admin__wrapper-image-name">
          <div className="admin__picture">
            {!loadImg ? (
              <img
                src={users.imageUrl}
                alt="Admin image"
                className="admin__person-image"
              />
            ) : (
              <div className="admin__overlay">
                <CircleSpinner part="admin" />
              </div>
            )}
          </div>
          <div className="admin__box-name">
            <p className="admin__name">{users.user}</p>
            <p className="admin__function">{users.role}</p>
          </div>
        </div>
        <button className="admin__button-logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;
