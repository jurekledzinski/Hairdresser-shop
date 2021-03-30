import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import { addSingleSection } from "../../../reduxStore/actions/actionScroll";

import "./Testimonial.scss";

import TestimonialSlider from "./TestimonialSlider";
import TestimonialForm from "./TestimonialForm";

const Testimonial = () => {
  const testimonialRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (testimonialRef.current) {
      dispatch(addSingleSection(testimonialRef.current));
    }
  }, []);

  return (
    <section className="testimonial" ref={testimonialRef}>
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
