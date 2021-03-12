import React from "react";

import "./ServicesIcons.scss";

const ServicesIcons = () => {
  return (
    <div className="service__icons">
      <div className="service__icon-wrapper">
        <span className="service__icon">
          <i className="fas fa-cut"></i>
        </span>
        <p className="service__text">
          You didn't actually see Tuco? You got this money from Tuco? Tuco gave
          you this is what you're saying? You made a deal?
        </p>
      </div>
      <div className="service__icon-wrapper">
        <span className="service__icon">
          <i className="fas fa-cut"></i>
        </span>
        <p className="service__text">
          Don't talk to me about hours, what about sudo, man? How are we gonna
          get that? You think the meth fairy is gonna just bring it to us?
        </p>
      </div>
      <div className="service__icon-wrapper">
        <span className="service__icon">
          <i className="fas fa-cut"></i>
        </span>
        <p className="service__text">
          Oh c'mon, this is bullshit! I mean look at this dude, alright? He
          doesn't even know what planet he's living on! You ever,
        </p>
      </div>
    </div>
  );
};

export default ServicesIcons;
