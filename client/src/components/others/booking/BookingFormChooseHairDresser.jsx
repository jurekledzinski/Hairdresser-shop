import React from "react";

import "./BookingFormChooseHairDresser.scss";

const BookingFormChooseHairDresser = () => {
  return (
    <div className="booking__input-wrapper">
      <label className="booking__label">Choose hairdresser</label>
      <select className="booking__input-select" name="hairdresserName">
        <option value="">-- Choose hairdresser --</option>
        <option value="john doe">John Doe</option>
        <option value="jim carry">Jim Carry</option>
        <option value="john johson">John Johson</option>
      </select>
    </div>
  );
};

export default BookingFormChooseHairDresser;
