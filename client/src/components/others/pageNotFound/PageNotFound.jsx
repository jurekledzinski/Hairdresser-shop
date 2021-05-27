import React from "react";
import { useHistory } from "react-router-dom";

import "./PageNotFound.scss";

const PageNotFound = () => {
  const history = useHistory();
  const url = history.location.pathname;
  const isBookingUrl = url.indexOf("booking");
  const isDetailsUrl = url.indexOf("details");
  const isSuccessUrl = url.indexOf("success");
  const isCancelUrl = url.indexOf("cancel");
  const isCancelCodeUrl = url.indexOf("cancel-code");
  const isLogin = url.indexOf("login");
  const isRegister = url.indexOf("register");

  const checkClass =
    (isBookingUrl !== -1 && isDetailsUrl !== -1) || isBookingUrl !== -1
      ? isSuccessUrl !== -1 || isCancelUrl !== -1 || isCancelCodeUrl !== -1
        ? "page-not-found"
        : "page-not-found page-not-found--booking-endpoint"
      : "page-not-found";

  const handleRedirectHomePage = () => {
    history.push("/");
  };

  return (
    <div
      className={
        isLogin !== -1 || isRegister !== -1
          ? "page-not-found app--booking-login-register"
          : checkClass
      }
    >
      <div className="page-not-found__wrapper-text">
        <h1 className="page-not-found__text">Page not found 404</h1>
        <button
          className="page-not-found__btn"
          onClick={handleRedirectHomePage}
        >
          Back homepage
        </button>
      </div>
    </div>
  );
};

export default PageNotFound;
