import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const useMoveScroll = (menuLinksRef, navigationHeader) => {
  const dataForScrollAnimation = useSelector((store) => store.scrollData);

  console.log(menuLinksRef, navigationHeader);

  const moveScroll = () => {
    if (
      dataForScrollAnimation.length > 0 &&
      Boolean(navigationHeader.current && menuLinksRef.current.length > 0)
    ) {
      dataForScrollAnimation.forEach((item, index) => {
        if (
          item.offsetTop - window.scrollY - 1 <
          -item.clientHeight + navigationHeader.current.clientHeight
        ) {
          menuLinksRef.current[index].childNodes[0].classList.remove(
            "header__menu-link--active"
          );
        } else if (
          window.scrollY + navigationHeader.current.clientHeight + 1 >
          item.offsetTop
        ) {
          menuLinksRef.current[index].childNodes[0].classList.add(
            "header__menu-link--active"
          );
        } else {
          menuLinksRef.current[index].childNodes[0].classList.remove(
            "header__menu-link--active"
          );
        }
      });
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", moveScroll);

    () => removeEventListener("scroll", moveScroll);
  }, [dataForScrollAnimation, navigationHeader.current, menuLinksRef.current]);
};

export default useMoveScroll;
