import React, { Fragment } from "react";

import "./ServicesPrices.scss";

const ServicesPrices = ({ column1, column2, column3 }) => {
  const columnPlanService1 = column1.map((item) => (
    <Fragment key={item.id}>
      <p className="service__service-title">{item.title}</p>
      <span className="service__service-price">{item.price}€</span>
    </Fragment>
  ));

  const columnPlanService2 = column2.map((item) => (
    <Fragment key={item.id}>
      <p className="service__service-title">{item.title}</p>
      <span className="service__service-price">{item.price}€</span>
    </Fragment>
  ));

  const columnPlanService3 = column3.map((item) => (
    <Fragment key={item.id}>
      <p className="service__service-title">{item.title}</p>
      <span className="service__service-price">{item.price}€</span>
    </Fragment>
  ));

  return (
    <div className="service__prices">
      <div className="service__button-wrapper">
        <div className="service__buttons-gender">
          <h4 className="service__plan-title">Plan & Pricings</h4>
          <button className="service__btn-men">Men</button>
          <button className="service__btn-women">Women</button>
        </div>
      </div>
      <div className="service__plans-prices">
        <div className="service__content">
          <div className="service__plan-cut">{columnPlanService1}</div>
          <div className="service__plan-cut">{columnPlanService2}</div>
          <div className="service__plan-cut">{columnPlanService3}</div>
        </div>
      </div>
      <ul className="service__dots-list">
        <li className="service__dot"></li>
        <li className="service__dot"></li>
        <li className="service__dot"></li>
      </ul>
    </div>
  );
};

export default ServicesPrices;
