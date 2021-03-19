import React from "react";

import "./BookingFormDayTime.scss";

const BookingFormDayTime = () => {
  return (
    <div className="booking__input-wrapper-day-time">
      <div className="booking__input-wrapper-day">
        <label className="booking__label">Choose day of appointment</label>
        <input type="date" className="booking__input-date" />
      </div>
      <div className="booking__input-wrapper-time">
        <label className="booking__label">Choose time of appointment</label>
        <select className="booking__input-select-time" name="timeAppointment">
          <option value="">-- Choose time --</option>
          <option value="ten">10:00</option>
          <option value="ten fourty-five">10:45</option>
          <option value="eleven thirty">11:30</option>
          <option value="twelve fifteen">12:15</option>
          <option value="thirteen">13:00</option>
          <option value="thirteen fourty-five">13:45</option>
          <option value="fourteen thirty">14:30</option>
          <option value="fifteen fifteen">15:15</option>
          <option value="sixteen">16:00</option>
          <option value="sixteen fourty-five">16:45</option>
          <option value="seventeen thirty">17:30</option>
          <option value="eightteen fifteen">18:15</option>
        </select>
      </div>
    </div>
  );
};

export default BookingFormDayTime;
