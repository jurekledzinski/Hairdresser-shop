import React from "react";

import "./CircleSpinner.scss";

const CircleSpinner = () => {
  return (
    <div className="loader">
      <svg className="loader__circle">
        <circle
          className="loader__path"
          cx="50"
          cy="50"
          r="20"
          fill="none"
          strokeWidth="2"
          strokeMiterlimit="10"
        />
      </svg>
    </div>
  );
};

export default CircleSpinner;
