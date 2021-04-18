import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useMoveScroll = (navigationHeader) => {
  const [currentSections, setCurrentSections] = useState([]);
  const dataForScrollAnimation = useSelector((store) => store.scrollData);
  const dataHeader = useSelector((store) => store.headerData);

  const moveScroll = () => {
    if (
      currentSections.length > 0 &&
      Boolean(navigationHeader.current && dataHeader.length > 0)
    ) {
      currentSections.forEach((item, index) => {
        if (
          item.offsetTop - window.scrollY - 1 <
          -item.clientHeight + navigationHeader.current.clientHeight
        ) {
          dataHeader[index].childNodes[0].classList.remove(
            "header__menu-link--active"
          );
        } else if (
          window.scrollY + navigationHeader.current.clientHeight + 1 >
          item.offsetTop
        ) {
          dataHeader[index].childNodes[0].classList.add(
            "header__menu-link--active"
          );
        } else {
          dataHeader[index].childNodes[0].classList.remove(
            "header__menu-link--active"
          );
        }
      });
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", moveScroll);

    () => removeEventListener("scroll", moveScroll);
  }, [currentSections, dataHeader, navigationHeader.current]);

  useEffect(() => {
    if (dataForScrollAnimation.length > 0) {
      setCurrentSections(dataForScrollAnimation);
    }
  }, [dataForScrollAnimation]);
};

export default useMoveScroll;
