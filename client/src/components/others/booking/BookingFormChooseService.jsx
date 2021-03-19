import React, { useState } from "react";

import "./BookingFormChooseService.scss";

const BookingFormChooseService = () => {
  const [isClickService, setIsClickService] = useState(false);

  const handleShowServices = () => {
    console.log("Pokaż services");
    setIsClickService((prevValue) => !prevValue);
  };

  return (
    <div className="booking__input-wrapper-services">
      <label className="booking__label">Choose service</label>
      <div className="booking__select-wrapper" onClick={handleShowServices}>
        <select className="booking__input-select" name="service">
          <option>-- Choose service --</option>
        </select>
        <div className="booking__coverSelect"></div>
      </div>
      <div
        className={
          isClickService
            ? "booking__checkbox-select"
            : "booking__checkbox-select--hidden"
        }
      >
        <div className="booking__services-men">
          <p className="booking__serivces-title">Men</p>
          <label className="booking__label-service" htmlFor="checkboxMen1">
            <input
              className="booking__input-service"
              type="checkbox"
              id="checkboxMen1"
            />
            First checkbox
          </label>
          <label className="booking__label-service" htmlFor="checkboxMen2">
            <input
              className="booking__input-service"
              type="checkbox"
              id="checkboxMen2"
            />
            Second checkbox
          </label>
          <label className="booking__label-service" htmlFor="checkboxMen3">
            <input
              className="booking__input-service"
              type="checkbox"
              id="checkboxMen3"
            />
            Third checkbox
          </label>
        </div>
        <div className="booking__services-women">
          <p className="booking__serivces-title">Women</p>
          <label className="booking__label-service" htmlFor="checkboxWomen1">
            <input
              className="booking__input-service"
              type="checkbox"
              id="checkboxWomen1"
            />
            First checkbox
          </label>
          <label className="booking__label-service" htmlFor="checkboxWomen2">
            <input
              className="booking__input-service"
              type="checkbox"
              id="checkboxWomen2"
            />
            Second checkbox
          </label>
          <label className="booking__label-service" htmlFor="checkboxWomen3">
            <input
              className="booking__input-service"
              type="checkbox"
              id="checkboxWomen3"
            />
            Third checkbox
          </label>
        </div>
      </div>
    </div>
  );
};

export default BookingFormChooseService;
