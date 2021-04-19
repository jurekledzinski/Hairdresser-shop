import React, { useCallback, useEffect, useRef, useState } from "react";
import { useHistory, withRouter } from "react-router-dom";

import { useDispatch } from "react-redux";

import { addServerErrorMessage } from "../../../reduxStore/actions/actionAlertsMessages";
import { addErrorServerWhenFetchData } from "../../../reduxStore/actions/actionServerError";

import "./TestimonialSlider.scss";

import { fetchOpinions } from "../../../utils/sessions";

const TestimonialSlider = () => {
  const dispatch = useDispatch();
  const [checkSizeWindow, setCheckSizeWindow] = useState(window.innerWidth);
  const [countCard, setCountCard] = useState(1);
  const [heightSizeSlider] = useState(0);
  const [initialX, setInitialX] = useState(null);
  const [initialY, setInitialY] = useState(null);
  const [scrollDiff, setScrollDiff] = useState(0);
  const [slides, setSlides] = useState([]);
  const [changeArraySlides, setChangeArraySlides] = useState([]);
  const [numSlide, setNumSlide] = useState(0);

  const idInterval = useRef(null);
  const sizeWindow = useRef(768);
  const slidesContainer = useRef(null);

  const history = useHistory();

  const location = history.location.pathname;

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

    if (numSlide <= 0) {
      setNumSlide(slides.length - 1);
    } else {
      setNumSlide((prevValue) => prevValue - 1);
    }
  }, [countCard, numSlide]);

  const handleLeftMove = useCallback(() => {
    if (countCard >= slidesContainer.current.children.length - 1) {
      return;
    } else {
      setCountCard((prevValue) => prevValue + 1);
      clearInterval(idInterval.current);
    }

    if (numSlide >= slides.length - 1) {
      setNumSlide(0);
    } else {
      setNumSlide((prevValue) => prevValue + 1);
    }
  }, [countCard, numSlide]);

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

      slidesContainer.current.children[
        slidesContainer.current.children.length - 1
      ].children[0].children[0].className = "testimonial__blockquote";

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

  const playIntervalSlider = () => {
    if (slides.length > 1) {
      idInterval.current = setInterval(() => {
        setCountCard((prevValue) => prevValue + 1);
        if (numSlide >= slides.length - 1) {
          setNumSlide(0);
        } else {
          setNumSlide((prevValue) => prevValue + 1);
        }
      }, 8000);
    }
  };

  useEffect(() => {
    if (location === "/") {
      playIntervalSlider();
    } else {
      clearInterval(idInterval.current);
    }

    return () => {
      return clearInterval(idInterval.current);
    };
  }, [countCard, location, numSlide, slides]);

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
          ? "testimonial__dot testimonial__dot--active "
          : "testimonial__dot"
      }
      onClick={() => handleClickDot(index + 1)}
    ></li>
  ));

  const customersNames = slides.map((item, index) =>
    numSlide === index ? (
      <p
        className={
          numSlide === index
            ? "testimonial__name testimonial__name--active"
            : "testimonial__name"
        }
        key={index}
      >
        {item.name}
      </p>
    ) : null
  );

  const customersImages = slides.map((item, index) => {
    return numSlide === index ? (
      <span className="testimonial__image-wrapper" key={index}>
        <img
          src={item.imageUrl}
          alt="Customer"
          className={
            numSlide === index
              ? "testimonial__img-person testimonial__img-person--active"
              : "testimonial__img-person"
          }
        />
      </span>
    ) : null;
  });

  const ratesValue = [1, 2, 3, 4, 5];

  const rateStars = slides.map((item1, index) => {
    return numSlide === index
      ? ratesValue.map((item2) => (
          <i
            key={item2}
            data-value={item2}
            className={
              item2 <= item1.rateStar
                ? "fas fa-star active rate-star"
                : "far fa-star rate-star"
            }
          ></i>
        ))
      : null;
  });

  useEffect(() => {
    let copyDeepSlides = [];

    slides.forEach((item) => {
      const singleSlide = { ...item };
      copyDeepSlides = [...copyDeepSlides, singleSlide];
    });

    const firstSlide = copyDeepSlides.slice(0, 1);
    const lastSlide = copyDeepSlides.slice(slides.length - 1);

    copyDeepSlides = [...lastSlide, ...copyDeepSlides];
    copyDeepSlides = [...copyDeepSlides, ...firstSlide];

    setChangeArraySlides(copyDeepSlides);
  }, []);

  const getRandomOpionions = async () => {
    const { data, status } = await fetchOpinions();

    if (status === 200) {
      setSlides(data);
    } else {
      const { alert, where, statusCode } = data;
      dispatch(addErrorServerWhenFetchData(alert, where, statusCode));
    }
  };

  useEffect(() => {
    getRandomOpionions();
  }, []);

  return (
    <div className="testimonial__slider">
      <div className="testimonial__slider-wrapper">
        <div className="testimonial__content" ref={slidesContainer}>
          {slides.map((item, index) => (
            <div className="testimonial__text" key={index}>
              <div className="testimonial__text-left">
                <blockquote
                  className={
                    countCard === index + 1
                      ? "testimonial__blockquote testimonial__blockquote--active"
                      : "testimonial__blockquote"
                  }
                >
                  {item.opinion}
                </blockquote>
              </div>
            </div>
          ))}
        </div>
        <div className="testimonial__text-right">
          {customersImages}
          <div className="testimonial__credentials">
            {customersNames}
            <div className="testimonial__rate-stars">{rateStars}</div>
            <div className="testimonial__control-wrapper">
              <span
                className="testimonial__arrow-left"
                onClick={handleLeftMove}
              >
                <i className="fas fa-angle-left"></i>
              </span>
              <span
                className="testimonial__arrow-right"
                onClick={handleRightMove}
              >
                <i className="fas fa-angle-right"></i>
              </span>
            </div>
            <ul className="testimonial__dots-wrapper">{dotsSlider}</ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(TestimonialSlider);
