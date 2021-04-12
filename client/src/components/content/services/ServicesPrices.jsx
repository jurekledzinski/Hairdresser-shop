import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import "./ServicesPrices.scss";

const slidesData = [
  {
    imgFront:
      "https://firebasestorage.googleapis.com/v0/b/hairdress-shop.appspot.com/o/Icon-cut.png?alt=media&token=c9167ab8-b4ac-4999-a20f-7d94b5b1bd86",
    men: [
      { title: "Classic haircut", price: 3.25, id: "1" },
      { title: "Classic haircut long hair", price: 5.5, id: "2" },
      { title: "Classic haircut & hair washing", price: 7.5, id: "3" },
      { title: "Trimming", price: 5.0, id: "4" },
    ],
    imgBack:
      "https://firebasestorage.googleapis.com/v0/b/hairdress-shop.appspot.com/o/Icon-cut-woman.png?alt=media&token=652ce079-ba35-4ba3-8fa2-5dc57010a8da",
    women: [
      { title: "Classic women’s haircuts", price: 3.25, id: "1" },
      { title: "Classic haircut long hair", price: 5.5, id: "2" },
      { title: "Classic haircut & hair washing", price: 7.5, id: "3" },
      { title: "Ladies’ fashion style cuts", price: 5.0, id: "4" },
    ],
  },
  {
    imgFront:
      "https://firebasestorage.googleapis.com/v0/b/hairdress-shop.appspot.com/o/Icon-razor.png?alt=media&token=330e5dab-c22a-4dcf-ba75-762a3c3de784",
    men: [
      { title: "Trimming & arranging long beard", price: 8.5, id: "5" },
      { title: "Stylization & arranging beard", price: 10.5, id: "6" },
      { title: "Classic haircut & shaving", price: 10.5, id: "7" },
      { title: "Haircut & trimming long beard", price: 6.5, id: "8" },
    ],
    imgBack:
      "https://firebasestorage.googleapis.com/v0/b/hairdress-shop.appspot.com/o/Icon-brush.png?alt=media&token=a508bed4-5159-424d-8bc8-56610c397b51",
    women: [
      { title: "Trending celebrity-inspired hairstyles", price: 8.5, id: "5" },
      { title: "Short female haircuts", price: 10.5, id: "6" },
      { title: "Classic haircut and colour", price: 10.5, id: "7" },
      { title: "Balayage colour", price: 6.5, id: "8" },
    ],
  },
  {
    imgFront:
      "https://firebasestorage.googleapis.com/v0/b/hairdress-shop.appspot.com/o/Icon-dryer.png?alt=media&token=201b19a8-a662-4144-b7c9-df01ca861254",
    men: [
      { title: "Classic shaving", price: 4.5, id: "9" },
      { title: "Hair washing", price: 3.5, id: "10" },
      { title: "Beard washing", price: 2.5, id: "11" },
      { title: "Beard & Hair washing", price: 5.0, id: "12" },
    ],
    imgBack:
      "https://firebasestorage.googleapis.com/v0/b/hairdress-shop.appspot.com/o/Icon-wash.png?alt=media&token=a656c958-6ebb-4508-a135-0cc1ef17f11c",
    women: [
      { title: "Hair extensions", price: 4.5, id: "9" },
      { title: "Keratin hair treatments", price: 3.5, id: "10" },
      { title: "Stylization haircut", price: 2.5, id: "11" },
      { title: "Hair washing", price: 5.0, id: "12" },
    ],
  },
];

const ServicesPrices = () => {
  const [countCard, setCountCard] = useState(1);
  const [chooseGenderMobile, setChooseGenderMobile] = useState(false);
  const [checkSizeWindow, setCheckSizeWindow] = useState(window.innerWidth);
  const [heightSizeSlider] = useState(0);

  const [initialX, setInitialX] = useState(null);
  const [initialY, setInitialY] = useState(null);
  const [isServiceMenOrWomen, setIsServiceMenOrWomen] = useState(false);
  const [scrollDiff, setScrollDiff] = useState(0);
  const [slides] = useState(slidesData);

  const idInterval = useRef(null);
  const sizeWindow = useRef(768);
  const slidesContainer = useRef(null);

  //   TODO: SLider logika

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
      let firstElement = slidesContainer.current.children[0].cloneNode(true);
      let lastElement = slidesContainer.current.children[
        slidesContainer.current.children.length - 1
      ].cloneNode(true);

      slidesContainer.current.insertBefore(
        lastElement,
        slidesContainer.current.children[0]
      );
      slidesContainer.current.append(firstElement);

      slidesContainer.current.style.transitionDuration = "0s";
    }
  }, [slides]);

  useEffect(() => {
    if (checkSizeWindow >= 768) {
      slidesContainer.current.children[0].style.display = "none";
      slidesContainer.current.children[
        slidesContainer.current.children.length - 1
      ].style.display = "none";
    } else {
      slidesContainer.current.children[0].style.display = "block";
      slidesContainer.current.children[
        slidesContainer.current.children.length - 1
      ].style.display = "block";
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

  //   To tylko dla service cards powyzej 768px aby byly na swoim miejscu

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
      //   if (window.innerWidth > 767) {
      //     window.scrollTo({
      //       top: heightSizeSlider + 20,
      //       behavior: "smooth",
      //     });
      //   } else {
      //     window.scrollTo({
      //       top: heightSizeSlider,
      //       behavior: "smooth",
      //     });
      //   }
    });

    slidesContainer.current.addEventListener("swipeDown", () => {
      //   window.scrollTo({
      //     top: 0,
      //     behavior: "smooth",
      //   });
    });
  }, [scrollDiff, heightSizeSlider]);

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

  //   TODO: SLider logika

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
          {slides.map((slide, index) => (
            <div
              className={
                checkSizeWindow >= sizeWindow.current
                  ? isServiceMenOrWomen
                    ? "service__plan-cut service__plan-cut--active"
                    : "service__plan-cut"
                  : "service__plan-cut"
              }
              key={index}
            >
              <div
                className={
                  checkSizeWindow >= sizeWindow.current
                    ? isServiceMenOrWomen
                      ? "service__inner-card service__inner-card--active"
                      : "service__inner-card"
                    : "service__inner-card"
                }
              >
                <div className="service__card-front">
                  <div className="service__card-front-top">
                    <img
                      src={slide.imgFront}
                      alt="Icon"
                      className="service__icon-img"
                    />
                  </div>
                  <div className="service__card-front-bottom">
                    {slide.men.map((serviceMen, index) => (
                      <Fragment key={serviceMen.id}>
                        <p className="service__service-title">
                          {serviceMen.title}
                        </p>
                        <span className="service__service-price">
                          {serviceMen.price}€
                        </span>
                      </Fragment>
                    ))}
                  </div>
                </div>
                <div
                  className={
                    checkSizeWindow >= sizeWindow.current
                      ? "service__card-back"
                      : chooseGenderMobile
                      ? "service__card-back service__card-back--active"
                      : "service__card-back"
                  }
                >
                  <div className="service__card-back-top">
                    <img
                      src={slide.imgBack}
                      alt="Icon"
                      className="service__icon-img"
                    />
                  </div>
                  <div className="service__card-back-bottom">
                    {slide.women.map((serviceWomen, index) => (
                      <Fragment key={serviceWomen.id}>
                        <p className="service__service-title">
                          {serviceWomen.title}
                        </p>
                        <span className="service__service-price">
                          {serviceWomen.price}€
                        </span>
                      </Fragment>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ul className="service__dots-list">{dotsSlider}</ul>
    </div>
  );
};

export default ServicesPrices;
