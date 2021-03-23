import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import "./AdminDashboard.scss";

import { menuOptions } from "./AdminAsideMenuOptions";

const AdminDashboard = () => {
  const [checkSizeWindow, setCheckSizeWindow] = useState(
    window.innerWidth >= 1200 ? true : false
  );
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  console.log(checkSizeWindow);

  const handleCloseOpenMenu = () => {
    setIsOpenMenu((prevValue) => !prevValue);
  };

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

  const checkWindowSize = () => {
    setCheckSizeWindow(window.innerWidth >= 1200 ? true : false);
  };

  useEffect(() => {
    window.addEventListener("resize", checkWindowSize);

    () => {
      window.removeEventListener("resize", checkWindowSize);
    };
  }, []);

  return (
    <section className="admin">
      <div className="admin__wrapper">
        <div className={isOpenMenu ? "admin__left--active" : "admin__left"}>
          <header className="admin__header">
            <aside className="admin__aside">
              <div className="admin__menu-wrapper">
                <div
                  className={
                    isOpenMenu
                      ? "admin__logo-wrapper--active"
                      : "admin__logo-wrapper"
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
          </header>
        </div>
        <div className={isOpenMenu ? "admin__right--active" : "admin__right"}>
          <header
            className={
              isOpenMenu ? "admin__right-nav--active" : "admin__right-nav"
            }
          >
            <div className="admin__nav-left">
              <div
                className={
                  isOpenMenu
                    ? "admin__hamburger-wrapper--active"
                    : "admin__hamburger-wrapper"
                }
              >
                <div
                  className="admin__hamburger-menu"
                  onClick={handleCloseOpenMenu}
                >
                  <span className="admin__hamburger-line"></span>
                  <span className="admin__hamburger-line"></span>
                  <span className="admin__hamburger-line"></span>
                </div>
              </div>
              <h3 className="admin__menu-option-name">Dashboard</h3>
            </div>
            <div className="admin__nav-right">
              <div className="admin__box-name">
                <p className="admin__name">Joe Doe</p>
                <p className="admin__function">Admin</p>
              </div>
            </div>
          </header>
          <main className="admin__dashboard-panel">
            <div className="admin__card-1 admin__card">Booked</div>
            <div className="admin__card-2 admin__card">Canceled</div>
            <div className="admin__card-3 admin__card">Customers</div>
            <div className="admin__card-4 admin__card">Emails</div>
            <div className="admin__card-5 admin__card">Income</div>
            <div className="admin__card-6 admin__card">Opinions</div>
            <div className="admin__card-7 admin__card">Visits</div>
            <div className="admin__card-8 admin__card">Time</div>
            <div className="admin__card-9 admin__card">Chart 1</div>
            <div className="admin__card-10 admin__card">Chart 2</div>
          </main>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
