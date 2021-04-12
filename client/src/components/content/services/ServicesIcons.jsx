import React from "react";

import "./ServicesIcons.scss";

const ServicesIcons = () => {
  return (
    <div className="service__icons">
      <div className="service__icon-wrapper">
        <div className="service__icon">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/hairdress-shop.appspot.com/o/Icon-cut-white.png?alt=media&token=3476179b-891c-47ea-b185-a2a8edaa4369"
            alt="Icon scissors"
            className="service__icon-image-offer"
          />
        </div>
        <p className="service__text">
          You didn't actually see Tuco? You got this money from Tuco? Tuco gave
          you this is what you're saying? You made a deal?
        </p>
      </div>
      <div className="service__icon-wrapper">
        <div className="service__icon">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/hairdress-shop.appspot.com/o/Icon-brash-white.png?alt=media&token=d30f3b45-15a8-47e4-ad47-bdefe6e4114c"
            alt="Icon scissors"
            className="service__icon-image-offer"
          />
        </div>
        <p className="service__text">
          Don't talk to me about hours, what about sudo, man? How are we gonna
          get that? You think the meth fairy is gonna just bring it to us?
        </p>
      </div>
      <div className="service__icon-wrapper">
        <div className="service__icon">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/hairdress-shop.appspot.com/o/Icon-wash-white.png?alt=media&token=0075ee04-45dc-4a5f-8b3e-96121a9cba70"
            alt="Icon scissors"
            className="service__icon-image-offer"
          />
        </div>
        <p className="service__text">
          Oh c'mon, this is bullshit! I mean look at this dude, alright? He
          doesn't even know what planet he's living on! You ever,
        </p>
      </div>
    </div>
  );
};

export default ServicesIcons;
