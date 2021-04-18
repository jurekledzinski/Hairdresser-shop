import React from "react";

import "./AdminHeader.scss";

import CircleSpinner from "../../spinner/CircleSpinner";

const AdminHeader = ({
  handleCloseOpenMenu,
  handleLogout,
  isOpenMenu,
  loadImg,
  users,
}) => {
  return (
    <header
      className={isOpenMenu ? "admin__right-nav--active" : "admin__right-nav"}
    >
      <div className="admin__nav-left">
        <div className="admin__extra-logo">Hp</div>
        <div
          className={
            isOpenMenu
              ? "admin__hamburger-wrapper--active"
              : "admin__hamburger-wrapper"
          }
        >
          <div className="admin__hamburger-menu" onClick={handleCloseOpenMenu}>
            <span className="admin__hamburger-line"></span>
            <span className="admin__hamburger-line"></span>
            <span className="admin__hamburger-line"></span>
          </div>
        </div>
        <h3 className="admin__menu-option-name">Dashboard</h3>
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
            <p className="admin__name">Joe Doe</p>
            <p className="admin__function">Admin</p>
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
