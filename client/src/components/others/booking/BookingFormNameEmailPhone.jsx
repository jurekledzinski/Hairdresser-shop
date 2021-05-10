import React, { Fragment } from "react";
import { Field, ErrorMessage } from "formik";

import "./BookingFormNameEmailPhone.scss";

const BookingFormNameEmailPhone = ({ errorMsg }) => {
  return (
    <Fragment>
      <div className="booking__input-wrapper">
        <ErrorMessage component={errorMsg} name="name" />
        <label className="booking__label">Name and surname</label>
        <Field className="booking__input" type="text" name="name" />
      </div>
      <div className="booking__input-wrapper">
        <ErrorMessage component={errorMsg} name="email" />
        <label className="booking__label">Email</label>
        <Field className="booking__input" type="email" name="email" />
      </div>
      <div className="booking__input-wrapper">
        <ErrorMessage component={errorMsg} name="phone" />
        <label className="booking__label">Phone number</label>
        <Field className="booking__input" type="text" name="phone" />
      </div>
    </Fragment>
  );
};

export default BookingFormNameEmailPhone;

{
  /* <div className="booking__input-wrapper">
<label className="booking__label">Name and surname</label>
<input className="booking__input" type="text" />
</div>
<div className="booking__input-wrapper">
<label className="booking__label">Email</label>
<input className="booking__input" type="email" />
</div>
<div className="booking__input-wrapper">
<label className="booking__label">Phone number</label>
<input className="booking__input" type="email" />
</div> */
}
