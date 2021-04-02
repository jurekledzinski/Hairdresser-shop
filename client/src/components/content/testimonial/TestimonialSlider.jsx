import React, { useCallback, useEffect, useRef, useState } from "react";
import { useHistory, withRouter } from "react-router-dom";

import "./TestimonialSlider.scss";

const opinions = [
  {
    name: "Joe Doe",
    rate: 5,
    imagePath:
      "https://firebasestorage.googleapis.com/v0/b/hairdress-shop.appspot.com/o/Person-1.png?alt=media&token=c2f870e8-ae4e-4552-b38d-be6ea1e75459",
    opinion:
      "Somehow, something tells me Hank is here because of you. And I'mnot forgetting that. Walt, please, let's both of us stop trying to justify this whole thing and admit you're in danger! Someone has to protect this family from the man who protects thisfamily.",
  },
  {
    name: "Kate Mike",
    rate: 3,
    imagePath:
      "https://firebasestorage.googleapis.com/v0/b/hairdress-shop.appspot.com/o/Person-2.png?alt=media&token=64833208-7f93-4043-8858-6fcba534fb39",
    opinion:
      "You talk about rehab oh gee, isn't that wonderful? Okay, you know what you need? I'll tell you exactly what you need. I am calling the police. I have tried ten years of love and understanding, maybe what it takes is you drying out in a jail cell.",
  },
  {
    name: "Moly Boo",
    rate: 2,
    imagePath:
      "https://firebasestorage.googleapis.com/v0/b/hairdress-shop.appspot.com/o/Person-3.png?alt=media&token=c28e70a0-f2af-45da-b27d-2427d70cd3f4",
    opinion:
      "Nice, thank you. Stay classy. Well, I'll tell you one thing. Your Hardy Boys routine is over. No more asking him to drive you on stakeouts. It's too dangerous, you hear me?",
  },
  {
    name: "Maya Mool",
    rate: 4,
    imagePath:
      "https://firebasestorage.googleapis.com/v0/b/hairdress-shop.appspot.com/o/Person-4.png?alt=media&token=0a6eff9a-5b12-40b2-8626-bd3d1c76c8a8",
    opinion:
      "He was just having fun. You'll get over it. Marco. Grab your old uncle a beer, would you? No, no. A cold one. This is what you wanted. Your brother dead. Right? You're going to have to try harder than that if you want to save him. How much longer do you think he has down there? One minute? Maybe more? Maybe less?",
  },
];

const TestimonialSlider = () => {
  const [checkSizeWindow, setCheckSizeWindow] = useState(window.innerWidth);
  const [countCard, setCountCard] = useState(1);
  const [heightSizeSlider] = useState(0);
  const [initialX, setInitialX] = useState(null);
  const [initialY, setInitialY] = useState(null);
  const [scrollDiff, setScrollDiff] = useState(0);
  const [slides] = useState(opinions);
  const [changeArraySlides, setChangeArraySlides] = useState([]);

  const idInterval = useRef(null);
  const sizeWindow = useRef(768);
  const slidesContainer = useRef(null);

  const history = useHistory();

  const location = history.location.pathname;

  console.log(countCard);

  // TODO: Logika slidera

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

  //TODO: Nowo dodane

  const playIntervalSlider = () => {
    if (slides.length > 1) {
      //   idInterval.current = setInterval(() => {
      //     setCountCard((prevValue) => prevValue + 1);
      //   }, 8000);
    }
  };

  useEffect(() => {
    console.log(location);
    if (location === "/") {
      playIntervalSlider();
    } else {
      clearInterval(idInterval.current);
    }

    return () => {
      return clearInterval(idInterval.current);
    };
  }, [countCard, location, slides]);

  useEffect(() => {
    if (location === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location]);

  //TODO: Nowo dodane

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
          ? "testimonial__dot testimonial__dot--active "
          : "testimonial__dot"
      }
      onClick={() => handleClickDot(index + 1)}
    ></li>
  ));

  const customersNames = slides?.map((item, index) =>
    countCard === index + 1 ? (
      <p
        className={
          countCard === index + 1
            ? "testimonial__name testimonial__name--active"
            : "testimonial__name"
        }
        key={index}
      >
        {item.name}
      </p>
    ) : null
  );

  const customersImages = slides?.map((item, index) => {
    return countCard === index + 1 ? (
      <span className="testimonial__image-wrapper" key={index}>
        <img
          src={item.imagePath}
          alt="Customer"
          className={
            countCard === index + 1
              ? "testimonial__img-person testimonial__img-person--active"
              : "testimonial__img-person"
          }
        />
      </span>
    ) : null;
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

    console.log(copyDeepSlides);

    setChangeArraySlides(copyDeepSlides);
  }, []);

  // TODO: Logika slidera

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
            <div className="testimonial__rate-stars">
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="far fa-star"></i>
              <i className="far fa-star"></i>
            </div>
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
            <div className="testimonial__dots-wrapper">{dotsSlider}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(TestimonialSlider);
