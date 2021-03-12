import React from "react";

import "./Services.scss";

import ServicesIcons from "./ServicesIcons";
import ServicesPrices from "./ServicesPrices";

const service = [
  { title: "Classic haircut", price: 3.25, id: "1" },
  { title: "Classic haircut long hair", price: 5.5, id: "2" },
  { title: "Classic haircut & hair washing", price: 7.5, id: "3" },
  { title: "Trimming", price: 5.0, id: "4" },
  { title: "Trimming & arranging long beard", price: 8.5, id: "5" },
  { title: "Stylization & arranging beard", price: 10.5, id: "6" },
  { title: "Classic haircut & shaving", price: 10.5, id: "7" },
  { title: "Haircut & trimming long beard", price: 6.5, id: "8" },
  { title: "Classic shaving", price: 4.5, id: "9" },
  { title: "Hair washing", price: 3.5, id: "10" },
  { title: "Beard washing", price: 2.5, id: "11" },
  { title: "Beard & Hair washing", price: 5.0, id: "12" },
];

const Services = () => {
  const column1 = service.slice(0, 4);
  const column2 = service.slice(4, 8);
  const column3 = service.slice(8, 12);

  return (
    <section className="service">
      <div className="service__wrapper">
        <h2 className="service__title">Services we offer</h2>
        <ServicesIcons />
        <ServicesPrices column1={column1} column2={column2} column3={column3} />
      </div>
    </section>
  );
};

export default Services;
