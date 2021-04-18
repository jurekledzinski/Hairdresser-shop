import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useHandleScrollToSection = () => {
  const [currentSections, setCurrentSections] = useState([]);
  const dataForScrollAnimation = useSelector((store) => store.scrollData);
  const dataHeader = useSelector((store) => store.headerData);

  const handleScrollSectionAfterClickLink = (index) => {
    if (dataHeader.length > 0) {
      dataHeader.map((item, i) => {
        index === i
          ? item.childNodes[0].classList.add("header__menu-link--active")
          : item.childNodes[0].classList.remove("header__menu-link--active");
      });
    }

    const clickedSection = currentSections[index];

    window.scrollTo({
      top: isNaN((index * clickedSection.offsetTop) / index - 50)
        ? 0
        : (index * clickedSection.offsetTop) / index - 50,
      left: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (dataForScrollAnimation.length > 0) {
      setCurrentSections(dataForScrollAnimation);
    }
  }, [dataForScrollAnimation]);

  return { handleScrollSectionAfterClickLink };
};

export default useHandleScrollToSection;
