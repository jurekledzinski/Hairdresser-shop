import React, { useCallback, useEffect, useRef, useState } from "react";

import Modal from "../../others/modal/Modal";

import "./GallerySlider.scss";

const dataImages = [
  {
    id: 0,
    imagePath:
      "https://firebasestorage.googleapis.com/v0/b/hairdress-shop.appspot.com/o/Example-1.jpg?alt=media&token=118ded5b-9530-41e9-9682-ca716cebb5d7",
  },
  {
    id: 1,
    imagePath:
      "https://firebasestorage.googleapis.com/v0/b/hairdress-shop.appspot.com/o/Example-2.jpg?alt=media&token=d57ca004-0f5f-46b6-ad70-9cc342208ec0",
  },
  {
    id: 2,
    imagePath:
      "https://firebasestorage.googleapis.com/v0/b/hairdress-shop.appspot.com/o/Example-3.jpg?alt=media&token=0ea9726d-f475-46e5-a995-9fb221542824",
  },
  {
    id: 3,
    imagePath:
      "https://firebasestorage.googleapis.com/v0/b/hairdress-shop.appspot.com/o/Example-4.jpg?alt=media&token=ebc16ae1-7b42-484f-a74c-a26fb501f1d9",
  },
];

const GallerySlider = () => {
  const [isOpenModal, setIsOpenModal] = useState(true);

  const [countCard, setCountCard] = useState(1);
  const [heightSizeSlider, setHeighSizetSlider] = useState(0);
  const [initialX, setInitialX] = useState(null);
  const [initialY, setInitialY] = useState(null);
  const [scrollDiff, setScrollDiff] = useState(0);
  const [slides, setSlides] = useState(dataImages);
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  const [widthSlider, setWidthSlider] = useState(1000);
  const [heightSlider, setHeightSlider] = useState(500);

  const handleCloseModalByButton = () => {
    setIsOpenModal(false);
  };

  const idInterval = useRef(null);
  const isMounted = useRef(null);
  const slidesContainer = useRef(null);

  //   TODO: Logika slideru

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
      slidesContainer.current.style.transform = `translateX(-${100}%)`;
    }
  }, [slides]);

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

  //   const playIntervalSlider = () => {
  //     if (slides.length > 1) {
  //       idInterval.current = setInterval(() => {
  //         setCountCard((prevValue) => prevValue + 1);
  //       }, 8000);
  //     }
  //   };

  //   FIXME: Start Resize slider

  const sizeSliderDefaultAndResizeLess1200 = (ratioHeight) => {
    let diff2 = (1000 * 100) / window.innerWidth - (1000 * 100) / 1000;
    let px = (window.innerWidth / 100) * 100 - diff2 - 40;
    setWidthSlider(px + "px");
    setHeightSlider(ratioHeight + "px");
  };

  const sizeSliderDefaultAndResizeLess768 = (heightratio) => {
    setWidthSlider(100 + "%");
    setHeightSlider(heightratio + "px");
  };

  useEffect(() => {
    const widthInnerWindow = window.innerWidth;
    const heightInnerWindow = window.innerHeight;
    const ratio = Math.min(widthInnerWindow / heightInnerWindow);

    setHeighSizetSlider(slidesContainer.current.offsetHeight);

    const sizePrecent = (1000 * 100) / window.innerWidth;
    setWidthSlider(sizePrecent + "%");
    // SetVisibilityArrows(true);

    if (window.innerWidth < 1000 && isMounted.current) {
      let ratioHeight = (heightInnerWindow * ratio) / 2;
      sizeSliderDefaultAndResizeLess1200(ratioHeight);
      //   SetVisibilityArrows(true);
    }

    if (window.innerWidth < 768 && isMounted.current) {
      let heightSliderWrapper = window.innerHeight;
      let heightratio = (heightSliderWrapper * ratio) / 2;
      sizeSliderDefaultAndResizeLess768(heightratio);
      //   SetVisibilityArrows(false);
    }

    if (window.innerWidth <= 411 && isMounted.current) {
      let heightSliderWrapper = window.innerHeight;
      let heightratio = (heightSliderWrapper * ratio) / 1.6;
      sizeSliderDefaultAndResizeLess768(heightratio);
      //   SetVisibilityArrows(false);
    }
  }, [window.innerWidth, heightSlider, widthSlider]);

  useEffect(() => {
    const resizeSlider = () => {
      setWindowSize(window.innerWidth);
      setWidthSlider(1000 + "px");
      setHeightSlider(500 + "px");

      let sizePrecent = (1000 * 100) / window.innerWidth;

      let widthWindowInner = window.innerWidth;
      let heightWindowInner = window.innerHeight;

      let ratio = Math.min(widthWindowInner / heightWindowInner);

      setWidthSlider(sizePrecent + "%");

      if (window.innerWidth < 1000 && isMounted.current) {
        let ratioHeight = (heightWindowInner * ratio) / 2;
        sizeSliderDefaultAndResizeLess1200(ratioHeight);
        // SetVisibilityArrows(true);
      }

      if (window.innerWidth < 768 && isMounted.current) {
        let heightInnerWindow = window.innerHeight;
        let heightRatio = (heightInnerWindow * ratio) / 2;
        sizeSliderDefaultAndResizeLess768(heightRatio);
        // SetVisibilityArrows(false);
      }

      if (window.innerWidth <= 411 && isMounted.current) {
        let heightInnerWindow = window.innerHeight;
        let heightRatio = (heightInnerWindow * ratio) / 1.6;
        sizeSliderDefaultAndResizeLess768(heightRatio);
        // SetVisibilityArrows(false);
      }
    };
    window.addEventListener("resize", resizeSlider);

    return function cleanupListenerSlider() {
      window.removeEventListener("resize", resizeSlider);
    };
  }, []);

  useEffect(() => {
    const minusMargin = window.innerWidth / 8;
    if (window.innerWidth - 17 < 760) {
      setWidthSlider(window.innerWidth - 17);
      //   SetVisibilityArrows(false);
    } else {
      setWidthSlider(window.innerWidth - minusMargin);
      //   SetVisibilityArrows(true);
    }
  }, []);

  //   FIXME: Koniec Resize slider

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
      if (window.innerWidth > 767) {
        window.scrollTo({
          top: heightSizeSlider + 20,
          behavior: "smooth",
        });
      } else {
        window.scrollTo({
          top: heightSizeSlider,
          behavior: "smooth",
        });
      }
    });

    slidesContainer.current.addEventListener("swipeDown", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }, [scrollDiff, window.innerWidth]);

  useEffect(() => {
    slidesContainer.current.addEventListener("swipeLeft", handleLeftMove);
    slidesContainer.current.addEventListener("swipeRight", handleRightMove);

    let sliderWrapper = slidesContainer.current;

    return () => {
      sliderWrapper.removeEventListener("swipeLeft", handleLeftMove);
      sliderWrapper.removeEventListener("swipeRight", handleRightMove);
    };
  }, [handleLeftMove, handleRightMove]);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

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

  //   TODO: Logika slideru

  return (
    <Modal isOpen={isOpenModal}>
      <section className="gallery-slider">
        <button
          className="gallery-slider__close-button"
          onClick={handleCloseModalByButton}
        >
          <i className="far fa-window-close"></i>
        </button>
        <div
          className="gallery-slider__wrapper"
          style={{ width: widthSlider, height: heightSlider }}
        >
          <span className="gallery-slider__arrow-left" onClick={handleLeftMove}>
            <i className="fas fa-chevron-left"></i>
          </span>
          <span
            className="gallery-slider__arrow-right"
            onClick={handleRightMove}
          >
            <i className="fas fa-chevron-right"></i>
          </span>
          <div className="gallery-slider__content" ref={slidesContainer}>
            {slides.map((item, index) => (
              <img
                className="gallery-slider__image"
                key={item.id}
                src={item.imagePath}
              />
            ))}
          </div>
        </div>
        <div className="gallery-slider__buttons-wrapper">
          <button className="gallery-slider__button">Men</button>
          <button className="gallery-slider__button">Women</button>
          <button className="gallery-slider__button">Children</button>
          <button className="gallery-slider__button">Weddings</button>
          <button className="gallery-slider__button">Others</button>
        </div>
      </section>
    </Modal>
  );
};

export default GallerySlider;
