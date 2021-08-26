import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import { addSingleSection } from "../../../reduxStore/actions/actionScroll";

import "./Services.scss";

import ServicesIcons from "./ServicesIcons";
import ServicesPrices from "./ServicesPrices";

const Services = () => {
  const servicesRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (servicesRef.current) {
      dispatch(addSingleSection(servicesRef.current));
    }
  }, []);

  return (
    <section className="service" ref={servicesRef}>
      <div className="service__wrapper">
        <h2 className="service__title">Services we offer</h2>
        <ServicesIcons />
        <ServicesPrices />
      </div>
    </section>
  );
};

export default Services;
