import React from "react";

import "./Testimonial.scss";

import TestimonialSlider from "./TestimonialSlider";
import TestimonialForm from "./TestimonialForm";

const Testimonial = () => {
  return (
    <section className="testimonial">
      <div className="testimonial__wrapper">
        <h2 className="testimonial__title">Testimonials</h2>
        <p className="testimonial__subtitle">
          One should, nevertheless, consider that there is a direct relation
          between the entity integrity and the capacity of the primary element.
        </p>
        <TestimonialSlider />
        <h3 className="testimonial__title-opinion">Send opinion</h3>
        <TestimonialForm />
      </div>
    </section>
  );
};

export default Testimonial;
