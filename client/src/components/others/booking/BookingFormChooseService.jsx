import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Field, ErrorMessage } from "formik";

import "./BookingFormChooseService.scss";

import { fetchAllCurrentServices } from "../../../reduxStore/actions/actionFetchAllServices";

const BookingFormChooseService = ({
  adminPanelClassLabel,
  adminPanelClassInput,
  errorMsg,
  selectServices,
  setSelectServices,
}) => {
  const dispatch = useDispatch();
  const dataAllServices = useSelector((store) => store.allServicesData);
  const { allServices } = dataAllServices;
  const dataDetectClickOutSide = useSelector(
    (store) => store.closeChooseServiceData
  );

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

  useEffect(() => {
    if (dataDetectClickOutSide.isOpen) {
      setIsClickService(false);
    }
  }, [dataDetectClickOutSide.isOpen]);

  return (
    <div className="booking__input-wrapper-services">
      <label
        className={
          adminPanelClassLabel === "adminPanelClassLabel"
            ? "booking__label--admin"
            : "booking__label"
        }
        data-outside="bookingOutside"
      >
        Choose service{" "}
        <ErrorMessage
          component={errorMsg}
          name="services"
          chooseService="chooseService"
        />
      </label>

      <div className="booking__select-wrapper" onClick={handleShowServices}>
        <select
          className={
            adminPanelClassInput === "adminPanelClassInput"
              ? "booking__input-select--admin"
              : "booking__input-select"
          }
          name="service"
        >
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
