import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Field, ErrorMessage } from "formik";

import "./BookingFormChooseService.scss";

import { fetchAllCurrentServices } from "../../../reduxStore/actions/actionFetchAllServices";

const BookingFormChooseService = ({
  errorMsg,
  selectServices,
  setSelectServices,
}) => {
  const dispatch = useDispatch();
  const dataAllServices = useSelector((store) => store.allServicesData);
  const { allServices } = dataAllServices;

  const [isClickService, setIsClickService] = useState(false);
  const [menServices, setMenServices] = useState([]);
  const [womenServices, setWomenServices] = useState([]);

  const handleShowServices = () => {
    setIsClickService((prevValue) => !prevValue);
  };

  const handleChangeMen = (e, index, id) => {
    const checked = e.target.checked;

    if (checked) {
      setSelectServices([...selectServices, menServices[index]]);
    } else {
      const removed = selectServices.filter((item) => item._id !== id);
      setSelectServices(removed);
    }
  };

  const handleChangeWomen = (e, index, id) => {
    const checked = e.target.checked;

    if (checked) {
      setSelectServices([...selectServices, womenServices[index]]);
    } else {
      const removed = selectServices.filter((item) => item._id !== id);
      setSelectServices(removed);
    }
  };

  useEffect(() => {
    dispatch(fetchAllCurrentServices());
  }, [dispatch]);

  const deepCopyServices = () => {
    let copy = [];
    allServices.forEach((item) => {
      const singleService = { ...item };
      copy = [...copy, singleService];
    });

    return copy;
  };

  useEffect(() => {
    if (allServices.length > 0) {
      let copyServices = deepCopyServices();

      let serviceMen = copyServices.filter((item) => item.gender === "men");
      let serviceWomen = copyServices.filter((item) => item.gender === "women");

      setMenServices(serviceMen);
      setWomenServices(serviceWomen);
    }
  }, [allServices]);

  return (
    <div className="booking__input-wrapper-services">
      <label className="booking__label">Choose service</label>
      <ErrorMessage component={errorMsg} name="services" />
      <div className="booking__select-wrapper" onClick={handleShowServices}>
        <select className="booking__input-select" name="service">
          <option>Choose service</option>
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
          <div className="booking__services-wrapper-men">
            {menServices.map((item, index) => {
              let singleItem = `${item.title},${item.price}`;
              return (
                <div className="booking__services-inputs-wrapper" key={index}>
                  <Field
                    className="booking__input-service"
                    type="checkbox"
                    name="services"
                    value={singleItem}
                    id={item._id}
                    onClick={(e) => handleChangeMen(e, index, item._id)}
                  />
                  <label className="booking__label-service" htmlFor={item._id}>
                    {item.title}
                  </label>
                  <span className="booking__select-price">{item.price}€</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="booking__services-women">
          <p className="booking__serivces-title">Women</p>
          <div className="booking__services-wrapper-women">
            {womenServices.map((item, index) => {
              let singleItem = `${item.title},${item.price}`;
              return (
                <div className="booking__services-inputs-wrapper" key={index}>
                  <Field
                    className="booking__input-service"
                    type="checkbox"
                    name="services"
                    value={singleItem}
                    id={item._id}
                    onClick={(e) => handleChangeWomen(e, index, item._id)}
                  />
                  <label className="booking__label-service" htmlFor={item._id}>
                    {item.title}
                  </label>
                  <span className="booking__select-price">{item.price}€</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingFormChooseService;

{
  /* <label className="booking__label-service" htmlFor="checkboxMen1">
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
</label> */
}

{
  /* <label className="booking__label-service" htmlFor="checkboxWomen1">
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
</label> */
}

{
  /* <Field name="services">
{({ field }) => {
  return (
    womenServices.length > 0 &&
    womenServices.map((option, index) => {
      return (
        <div
          className="booking__services-inputs-wrapper"
          key={index}
        >
          <input
            className="booking__input-service"
            type="checkbox"
            id={option._id}
            value={option.title}
            checked={
              field.title !== undefined
                ? field.title.includes(option.title)
                : field.title
            }
          />
          <label
            className="booking__label-service"
            htmlFor={option._id}
          >
            {option.title}
          </label>
          <span className="booking__select-price">
            {option.price}€
          </span>
        </div>
      );
    })
  );
}}
</Field> */
}

// <FieldArray name="services">
//               {({ field }) => {
//                 return (
//                   menServices.length > 0 &&
//                   menServices?.map((option, index) => {
//                     return (
//                       <div
//                         className="booking__services-inputs-wrapper"
//                         key={index}
//                       >
//                         <input
//                           className="booking__input-service"
//                           type="checkbox"
//                           id={option._id}
//                           value={option.title}
//                           checked={
//                             field.title !== undefined
//                               ? field.title.includes(option.title)
//                               : field.title
//                           }
//                         />
//                         <label
//                           className="booking__label-service"
//                           htmlFor={option._id}
//                         >
//                           {option.title}{" "}
//                         </label>
//                         <span className="booking__select-price">
//                           {option.price}€
//                         </span>
//                       </div>
//                     );
//                   })
//                 );
//               }}
//             </FieldArray>
