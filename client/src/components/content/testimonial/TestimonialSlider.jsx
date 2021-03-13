import React from "react";

import "./TestimonialSlider.scss";

const TestimonialSlider = () => {
  return (
    <div className="testimonial__slider">
      <div className="testimonial__content">
        <div className="testimonial__text">
          <div className="testimonial__text-left"></div>
          <div className="testimonial__text-right">
            <div className="testimonial__credentials">
              <p className="testimonial__name">David Miller</p>
              <div className="testimonial__rate-stars">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="far fa-star"></i>
                <i className="far fa-star"></i>
              </div>
              <div className="testimonial__control-wrapper">
                <span className="testimonial__arrow-left">
                  <i className="fas fa-angle-left"></i>
                </span>
                <span className="testimonial__arrow-right">
                  <i className="fas fa-angle-right"></i>
                </span>
              </div>
              <div className="testimonial__dots-wrapper">
                <span className="testimonial__dot"></span>
                <span className="testimonial__dot"></span>
                <span className="testimonial__dot"></span>
              </div>
            </div>
          </div>
          <span className="testimonial__image-wrapper"></span>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSlider;
