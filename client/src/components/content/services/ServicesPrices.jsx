import React, { useCallback, useEffect, useRef, useState } from "react";

import "./ServicesPrices.scss";

import ServiceCards from "./ServiceCards";

const slidesData = [{}, {}, {}];

const ServicesPrices = () => {
  const [countCard, setCountCard] = useState(1);
  const [chooseGenderMobile, setChooseGenderMobile] = useState(false);
  const [checkSizeWindow, setCheckSizeWindow] = useState(window.innerWidth);

  const [initialX, setInitialX] = useState(null);
  const [initialY, setInitialY] = useState(null);
  const [isServiceMenOrWomen, setIsServiceMenOrWomen] = useState(false);
  const [scrollDiff, setScrollDiff] = useState(0);
  const [slides] = useState(slidesData);

  const idInterval = useRef(null);
  const idTimeOut = useRef(null);
  const idTimeOut2 = useRef(null);
  const idTimeOut3 = useRef(null);
  const sizeWindow = useRef(768);
  const slidesContainer = useRef(null);

  const events = {
    swipeUp: new Event("swipeUp"),
    swipeDown: new Event("swipeDown"),
    swipeLeft: new Event("swipeLeft"),
    swipeRight: new Event("swipeRight"),
  };

  const handleRightMove = useCallback(() => {
    if (countCard <= 0) {
      return;
    } else {
      setCountCard((prevValue) => prevValue - 1);
      clearInterval(idInterval.current);
    }
  }, [countCard]);

  const handleLeftMove = useCallback(() => {
    if (countCard >= slidesContainer.current.children.length - 1) {
      return;
    } else {
      setCountCard((prevValue) => prevValue + 1);
      clearInterval(idInterval.current);
    }
  }, [countCard]);

  const handleClickDot = (dotIndex) => {
    setCountCard(dotIndex);
  };

  useEffect(() => {
    if (slides.length > 0) {
      idTimeOut.current = setTimeout(() => {
        let firstElement = slidesContainer.current.children[0].cloneNode(true);
        let lastElement =
          slidesContainer.current.children[
            slidesContainer.current.children.length - 1
          ].cloneNode(true);

        slidesContainer.current.insertBefore(
          lastElement,
          slidesContainer.current.children[0]
        );
        slidesContainer.current.append(firstElement);

        slidesContainer.current.style.transitionDuration = "0s";
      }, 1000);
    }
  }, [slides]);

  useEffect(() => {
    if (checkSizeWindow > 767) {
      idTimeOut2.current = setTimeout(() => {
        slidesContainer.current.children[0].style.display = "none";
        slidesContainer.current.children[
          slidesContainer.current.children.length - 1
        ].style.display = "none";
      }, 1000);
      slidesContainer.current.style.transitionDuration = "0s";
      slidesContainer.current.style.transform = `translateX(${0}%)`;
    } else {
      idTimeOut3.current = setTimeout(() => {
        slidesContainer.current.children[0].style.display = "block";
        slidesContainer.current.children[
          slidesContainer.current.children.length - 1
        ].style.display = "block";
      }, 1000);
      slidesContainer.current.style.transform = `translateX(-${100}%)`;
      slidesContainer.current.style.transitionDuration = "0s";
    }
  }, [checkSizeWindow]);

  useEffect(() => {
    slidesContainer.current.style.transitionDuration = "0.5s";
    slidesContainer.current.style.transform = `translateX(-${
      100 * countCard
    }%)`;

    if (countCard === slidesContainer.current.children.length - 1) {
      setTimeout(() => {
        slidesContainer.current.style.transitionDuration = "0.0s";
        slidesContainer.current.style.transform = `translateX(-${100}%)`;
        setTimeout(() => {
          setCountCard(1);
        }, 15);
        return;
      }, 502);
    } else if (countCard <= 0) {
      setTimeout(() => {
        slidesContainer.current.style.transitionDuration = "0.0s";
        slidesContainer.current.style.transform = `translateX(-${
          100 * slides.length
        }%)`;
        setTimeout(() => {
          setCountCard(slides.length);
        }, 15);
        return;
      }, 502);
    }
  }, [countCard, slides.length]);

  useEffect(() => {
    if (checkSizeWindow >= sizeWindow.current) {
      slidesContainer.current.style.transform = `translateX(${0}%)`;
    }
  }, [checkSizeWindow]);

  const startTouchDisplay = (e) => {
    e.preventDefault();
    const touchX = e.touches[0].clientX;
    const touchY = e.touches[0].clientY;
    setInitialX(touchX);
    setInitialY(touchY);
  };

  useEffect(() => {
    const moveTouchDisplay = (e) => {
      e.preventDefault();

      if (!initialX || !initialY) {
        return;
      }

      const currenTouchX = e.touches[0].clientX;
      const currenTouchY = e.touches[0].clientY;

      const diffrenceX = initialX - currenTouchX;
      const diffrenceY = initialY - currenTouchY;

      setScrollDiff(diffrenceY);

      if (Math.abs(diffrenceX) > Math.abs(diffrenceY)) {
        if (diffrenceX > 0) {
          slidesContainer.current.dispatchEvent(events.swipeLeft);
        } else {
          slidesContainer.current.dispatchEvent(events.swipeRight);
        }
      } else {
        if (diffrenceY > 0) {
          slidesContainer.current.dispatchEvent(events.swipeUp);
        } else {
          slidesContainer.current.dispatchEvent(events.swipeDown);
        }
      }

      setInitialX(null);
      setInitialY(null);
    };

    slidesContainer.current.addEventListener("touchstart", startTouchDisplay);
    slidesContainer.current.addEventListener("touchmove", moveTouchDisplay);

    let container = slidesContainer.current;
    return () => {
      container.removeEventListener("touchstart", startTouchDisplay);
      container.removeEventListener("touchmove", moveTouchDisplay);
    };
  }, [
    events.swipeLeft,
    events.swipeRight,
    events.swipeUp,
    events.swipeDown,
    initialX,
    initialY,
  ]);

  useEffect(() => {
    slidesContainer.current.addEventListener("swipeUp", () => {
      if (window.innerWidth < 767) {
        window.scrollTo({
          top: window.scrollY + (window.scrollY / 3) * 1.6,
          behavior: "smooth",
        });
      }
    });

    slidesContainer.current.addEventListener("swipeDown", () => {
      window.scrollTo({
        top: window.scrollY - (window.scrollY / 3) * 1.6,
        behavior: "smooth",
      });
    });
  }, [scrollDiff]);

  useEffect(() => {
    slidesContainer.current.addEventListener("swipeLeft", handleLeftMove);
    slidesContainer.current.addEventListener("swipeRight", handleRightMove);

    let sliderWrapper = slidesContainer.current;

    return () => {
      sliderWrapper.removeEventListener("swipeLeft", handleLeftMove);
      sliderWrapper.removeEventListener("swipeRight", handleRightMove);
    };
  }, [handleLeftMove, handleRightMove]);

  const dotsSlider = slides.map((item, index) => (
    <li
      key={index}
      className={
        countCard === index + 1
          ? "service__dot service__dot--active "
          : "service__dot"
      }
      onClick={() => handleClickDot(index + 1)}
    ></li>
  ));

  const handleChangeServiceToMen = () => {
    setIsServiceMenOrWomen(false);
    setChooseGenderMobile(false);
    slidesContainer.current.children[0].children[0].children[1].className =
      "service__card-back";

    slidesContainer.current.children[
      slidesContainer.current.children.length - 1
    ].children[0].children[1].className = "service__card-back";
  };

  const handleChangeServiceToWomen = () => {
    setIsServiceMenOrWomen(true);
    setChooseGenderMobile(true);
    slidesContainer.current.children[0].children[0].children[1].className =
      "service__card-back service__card-back--active";

    slidesContainer.current.children[
      slidesContainer.current.children.length - 1
    ].children[0].children[1].className =
      "service__card-back service__card-back--active";
  };

  const getCurrentWindowSize = () => {
    setCheckSizeWindow(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", getCurrentWindowSize);

    return () => window.removeEventListener("resize", getCurrentWindowSize);
  }, []);

  useEffect(() => {
    return () => {
      clearTimeout(idTimeOut.current);
      clearTimeout(idTimeOut2.current);
      clearTimeout(idTimeOut3.current);
    };
  }, []);

  return (
    <div className="service__prices">
      <div className="service__button-wrapper">
        <div className="service__buttons-gender">
          <h4 className="service__plan-title">Plan & Pricings</h4>
          <button
            className={
              isServiceMenOrWomen
                ? "service__btn-men"
                : "service__btn-men service__btn-men--active"
            }
            onClick={handleChangeServiceToMen}
          >
            Men
          </button>
          <button
            className={
              isServiceMenOrWomen
                ? "service__btn-women service__btn-women--active"
                : "service__btn-women"
            }
            onClick={handleChangeServiceToWomen}
          >
            Women
          </button>
        </div>
      </div>
      <div className="service__plans-prices">
        <div className="service__content" ref={slidesContainer}>
          <ServiceCards
            checkSizeWindow={checkSizeWindow}
            chooseGenderMobile={chooseGenderMobile}
            isServiceMenOrWomen={isServiceMenOrWomen}
            sizeWindow={sizeWindow}
          />
        </div>
      </div>
      <ul className="service__dots-list">{dotsSlider}</ul>
    </div>
  );
};

export default ServicesPrices;
