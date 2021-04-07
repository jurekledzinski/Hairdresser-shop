import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import { switchToOpenCloseModal } from "../../../reduxStore/actions/actionOpenModal";

import Modal from "../../others/modal/Modal";

import "./GallerySlider.scss";

import CircleSpinner from "../../others/spinner/CircleSpinner";
import { buttonsGallerySlider } from "./GallerySliderButtons";

import { imgSliderMen } from "./Images";
import { imgSliderWomen } from "./Images";
import { imgSliderChildren } from "./Images";
import { imgSliderWeddings } from "./Images";
import { imgSliderOthers } from "./Images";

const GallerySlider = ({
  clickedImgCounter,
  indexBtn,
  resetClickedImgIndex,
  setIndexBtn,
  setTurnOffTransitionSlider,
  turnOffTransitionSlider,
}) => {
  const dispatch = useDispatch();

  const [countCard, setCountCard] = useState(0);
  const [heightSizeSlider, setHeighSizetSlider] = useState(0);
  const [isLoad, setIsLoad] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [initialX, setInitialX] = useState(null);
  const [initialY, setInitialY] = useState(null);
  const [scrollDiff, setScrollDiff] = useState(0);
  const [slides, setSlides] = useState(imgSliderMen);
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  const [widthSlider, setWidthSlider] = useState(1000);
  const [heightSlider, setHeightSlider] = useState(500);

  const handleCloseModalByButton = () => {
    setCountCard(0);
    setIsOpenModal(false);
    resetClickedImgIndex(0);
  };

  const idInterval = useRef(null);
  const isMounted = useRef(null);
  const idTimeOut = useRef(null);
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

  console.log(
    countCard,
    "liczba counter",
    turnOffTransitionSlider,
    "turnoff transition"
  );

  useEffect(() => {
    if (slides.length > 0 && Boolean(slidesContainer.current)) {
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
      turnOffTransitionSlider ? null : setCountCard(1);
    }
  }, [isOpenModal, slides]);

  useEffect(() => {
    if (Boolean(slidesContainer.current)) {
      slidesContainer.current.style.transitionDuration = "0s";
      slidesContainer.current.children[0].remove();
      slidesContainer.current.children[
        slidesContainer.current.children.length - 1
      ].remove();
    }
  }, [indexBtn]);

  useEffect(() => {
    if (Boolean(slidesContainer.current)) {
      turnOffTransitionSlider
        ? (slidesContainer.current.style.transitionDuration = "0s")
        : (slidesContainer.current.style.transitionDuration = "0.5s");
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
    }
  }, [countCard, slides.length]);

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

    if (Boolean(slidesContainer.current)) {
      setHeighSizetSlider(slidesContainer.current.offsetHeight);
    }

    const sizePrecent = (1000 * 100) / window.innerWidth;
    setWidthSlider(sizePrecent + "%");

    if (window.innerWidth < 1000 && isMounted.current) {
      let ratioHeight = (heightInnerWindow * ratio) / 2;
      sizeSliderDefaultAndResizeLess1200(ratioHeight);
    }

    if (window.innerWidth < 768 && isMounted.current) {
      let heightSliderWrapper = window.innerHeight;
      let heightratio = (heightSliderWrapper * ratio) / 2;
      sizeSliderDefaultAndResizeLess768(heightratio);
    }

    if (window.innerWidth <= 411 && isMounted.current) {
      let heightSliderWrapper = window.innerHeight;
      let heightratio = (heightSliderWrapper * ratio) / 1.6;
      sizeSliderDefaultAndResizeLess768(heightratio);
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
      }

      if (window.innerWidth < 768 && isMounted.current) {
        let heightInnerWindow = window.innerHeight;
        let heightRatio = (heightInnerWindow * ratio) / 2;
        sizeSliderDefaultAndResizeLess768(heightRatio);
      }

      if (window.innerWidth <= 411 && isMounted.current) {
        let heightInnerWindow = window.innerHeight;
        let heightRatio = (heightInnerWindow * ratio) / 1.6;
        sizeSliderDefaultAndResizeLess768(heightRatio);
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
    } else {
      setWidthSlider(window.innerWidth - minusMargin);
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

    if (slidesContainer.current) {
      slidesContainer.current.addEventListener("touchstart", startTouchDisplay);
      slidesContainer.current.addEventListener("touchmove", moveTouchDisplay);
    }

    let container = slidesContainer.current;
    return () => {
      if (container) {
        container.removeEventListener("touchstart", startTouchDisplay);
        container.removeEventListener("touchmove", moveTouchDisplay);
      }
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
    if (Boolean(slidesContainer.current)) {
      slidesContainer.current.addEventListener("swipeLeft", handleLeftMove);
      slidesContainer.current.addEventListener("swipeRight", handleRightMove);
    }

    let sliderWrapper = slidesContainer.current;

    return () => {
      if (sliderWrapper) {
        sliderWrapper.removeEventListener("swipeLeft", handleLeftMove);
        sliderWrapper.removeEventListener("swipeRight", handleRightMove);
      }
    };
  }, [handleLeftMove, handleRightMove, slidesContainer.current]);

  useEffect(() => {
    if (Boolean(clickedImgCounter)) {
      setIsOpenModal(true);
      setCountCard(clickedImgCounter);
    }
  }, [clickedImgCounter]);

  useEffect(() => {
    switch (indexBtn) {
      case 0:
        setSlides(imgSliderMen);
        break;
      case 1:
        setSlides(imgSliderWomen);
        break;
      case 2:
        setSlides(imgSliderChildren);
        break;
      case 3:
        setSlides(imgSliderWeddings);
        break;
      case 4:
        setSlides(imgSliderOthers);
        break;
      default:
        setSlides([]);
        break;
    }
  }, [indexBtn]);

  useEffect(() => {
    dispatch(switchToOpenCloseModal(isOpenModal));
  }, [isOpenModal]);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
      clearTimeout(idTimeOut.current);
    };
  }, []);

  useEffect(() => {
    setIsLoad(false);
  }, [indexBtn]);

  useEffect(() => {
    setTurnOffTransitionSlider(false);
  }, [countCard]);

  const handleChooseImages = (indexNumArrImages) => {
    setIndexBtn(indexNumArrImages);
  };

  const handleOnloadImage = () => {
    idTimeOut.current = setTimeout(() => setIsLoad(true), 500);
  };

  const dotsSlider = slides.map((item, index) => (
    <li
      key={index}
      className={
        countCard === index + 1
          ? "gallery-slider__dot gallery-slider__dot--active "
          : "gallery-slider__dot"
      }
      onClick={() => handleClickDot(index + 1)}
    ></li>
  ));

  //   TODO: Logika slideru

  return (
    <Modal isOpen={isOpenModal}>
      <section className="gallery-slider">
        <div
          className="gallery-slider__wrapper"
          style={{ width: widthSlider, height: heightSlider }}
        >
          <button
            className="gallery-slider__close-button"
            onClick={handleCloseModalByButton}
          >
            <i className="far fa-window-close"></i>
          </button>
          <div className="gallery-slider__inner">
            <span
              className="gallery-slider__arrow-left"
              onClick={handleLeftMove}
            >
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
                <div className="gallery-slider__img-wrapper" key={index}>
                  <img
                    className="gallery-slider__image"
                    key={item.id}
                    src={item.imagePath}
                    onLoad={handleOnloadImage}
                  />
                  {!isLoad && (
                    <div className="gallery-slider__overlay">
                      <CircleSpinner />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        <ul className="gallery-slider__dots-wrapper">{dotsSlider}</ul>
        <div className="gallery-slider__buttons-wrapper">
          {buttonsGallerySlider.map((item, index) => (
            <button
              className={
                indexBtn === index
                  ? "gallery-slider__button gallery-slider__button--active"
                  : "gallery-slider__button"
              }
              key={index}
              onClick={() => handleChooseImages(index)}
            >
              {item.text}
            </button>
          ))}
        </div>
      </section>
    </Modal>
  );
};

export default GallerySlider;
