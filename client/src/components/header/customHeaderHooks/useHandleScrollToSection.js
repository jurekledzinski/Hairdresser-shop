import React from "react";
import { useSelector } from "react-redux";

const useHandleScrollToSection = (menuLinksRef) => {
  const dataForScrollAnimation = useSelector((store) => store.scrollData);

  const handleScrollSectionAfterClickLink = (index) => {
    if (menuLinksRef.current.length > 0) {
      menuLinksRef.current.map((item, i) => {
        index === i
          ? item.childNodes[0].classList.add("header__menu-link--active")
          : item.childNodes[0].classList.remove("header__menu-link--active");
      });
    }

    const clickedSection = dataForScrollAnimation[index];

    window.scrollTo({
      top: isNaN((index * clickedSection.offsetTop) / index - 50)
        ? 0
        : (index * clickedSection.offsetTop) / index - 50,
      left: 0,
      behavior: "smooth",
    });
  };

  return { handleScrollSectionAfterClickLink };
};

export default useHandleScrollToSection;
