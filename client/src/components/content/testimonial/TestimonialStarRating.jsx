import React from "react";

const TestimonialStarRating = ({ handleRating, item, value }) => {
  return (
    <i
      className={
        item <= value
          ? "fas fa-star active testimonial__star-active"
          : "far fa-star"
      }
      data-value={item}
      onClick={handleRating}
    ></i>
  );
};

export default TestimonialStarRating;
