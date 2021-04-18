import React from "react";
import { NavLink } from "react-router-dom";

import "./AdminAside.scss";

import { menuOptions } from "./AdminAsideMenuOptions";

const AdminAside = ({ checkSizeWindow, isOpenMenu }) => {
  const menuLi = menuOptions.map((item, index) => (
    <li
      className={isOpenMenu ? "admin__item--active" : item.classItem}
      key={index}
    >
      <NavLink
        exact
        className={item.classLink}
        activeClassName={item.activeClassLink}
        to={item.pathLink}
      >
        <span className={item.classIcon}>
          <i className={item.classFontAwesome}></i>
        </span>
        <span
          className={isOpenMenu ? "admin__option--active" : item.classOption}
        >
          {item.text}
        </span>
      </NavLink>
    </li>
  ));

  return (
    <aside className="admin__aside">
      <div className="admin__menu-wrapper">
        <div
          className={
            isOpenMenu ? "admin__logo-wrapper--active" : "admin__logo-wrapper"
          }
        >
          {isOpenMenu ? (
            checkSizeWindow ? (
              <span className="admin__logo-mobile">Hp</span>
            ) : (
              <p className="admin__logo">
                <span
                  className={
                    isOpenMenu
                      ? "admin__logo-part-1--active"
                      : "admin__logo-part-1"
                  }
                >
                  Hair
                </span>
                <span
                  className={
                    isOpenMenu
                      ? "admin__logo-part-2--active"
                      : "admin__logo-part-2"
                  }
                >
                  planet
                </span>
              </p>
            )
          ) : checkSizeWindow ? (
            <p className="admin__logo">
              <span
                className={
                  isOpenMenu
                    ? "admin__logo-part-1--active"
                    : "admin__logo-part-1"
                }
              >
                Hair
              </span>
              <span
                className={
                  isOpenMenu
                    ? "admin__logo-part-2--active"
                    : "admin__logo-part-2"
                }
              >
                planet
              </span>
            </p>
          ) : (
            <span className="admin__logo-mobile">Hp</span>
          )}
        </div>
        <ul className="admin__menu">{menuLi}</ul>
      </div>
    </aside>
  );
};

export default AdminAside;
