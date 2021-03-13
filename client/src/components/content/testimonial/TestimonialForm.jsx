import React from "react";

import "./TestimonialForm.scss";

const TestimonialForm = () => {
  return (
    <div className="testimonial__form">
      <form className="testimonial__form-wrapper">
        <input className="testimonial__form-input" type="text" />
        <div className="testimonial__form-rating">
          <p className="testimonial__add-rate">
            Add rate:
            <span className="testimonial__stars">
              <i className="far fa-star"></i>
              <i className="far fa-star"></i>
              <i className="far fa-star"></i>
              <i className="far fa-star"></i>
              <i className="far fa-star"></i>
            </span>
          </p>

          <input className="testimonial__input-file" type="file" />
        </div>
        <textarea
          className="testimonial__form-textarea"
          cols="30"
          rows="10"
        ></textarea>
        <button className="testimonial__form-button">Send</button>
      </form>
    </div>
  );
};

export default TestimonialForm;
