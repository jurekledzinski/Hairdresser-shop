import React from "react";

import "./HeaderTitle.scss";

const HeaderTitle = () => {
  return (
    <div className="header__main-titles">
      <h1 className="header__title">
        <span className="header__title-part-1">Welcome in</span> our barber shop
      </h1>
      <p className="header__subtitle">
        <span className="header__subtitle-part-1">an amazing barber </span>
        experience
      </p>
    </div>
  );
};

export default HeaderTitle;
