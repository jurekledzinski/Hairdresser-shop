import React from "react";
import { Field, ErrorMessage } from "formik";

import "./BookingFormChooseHairDresser.scss";

const options = [
  { key: "Select an option", value: "" },
  { key: "Joe Doe", value: "Joe Doe" },
  { key: "Jim Carry", value: "Jim Carry" },
  { key: "John Johson", value: "John Johson" },
];

const BookingFormChooseHairDresser = ({
  errorMsg,
  adminPanelClassLabel,
  adminPanelClassInput,
}) => {
  return (
    <div className="booking__input-wrapper">
      <ErrorMessage name="hairdresserName" component={errorMsg} />
      <label
        className={
          adminPanelClassLabel === "adminPanelClassLabel"
            ? "booking__label--admin"
            : "booking__label"
        }
        htmlFor="selectOption"
      >
        Choose hairdresser
      </label>
      <Field
        as="select"
        id="selectOption"
        name="hairdresserName"
        className={
          adminPanelClassInput === "adminPanelClassInput"
            ? "booking__input-select--admin"
            : "booking__input-select"
        }
      >
        {options.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.key}
            </option>
          );
        })}
      </Field>
    </div>
  );
};

export default BookingFormChooseHairDresser;
