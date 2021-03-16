import React from "react";

import "./TestimonialSlider.scss";

const TestimonialSlider = () => {
  return (
    <div className="testimonial__slider">
      <div className="testimonial__content">
        <div className="testimonial__text">
          <div className="testimonial__text-left">
            <blockquote className="testimonial__blockquote">
              Somehow, something tells me Hank is here because of you. And I'm
              not forgetting that. Walt, please, let's both of us stop trying to
              justify this whole thing and admit you're in danger! Someone has
              to protect this family from the man who protects this family.
            </blockquote>
            <span className="testimonial__image-wrapper"></span>
          </div>
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
        </div>
      </div>
    </div>
  );
};

export default TestimonialSlider;
