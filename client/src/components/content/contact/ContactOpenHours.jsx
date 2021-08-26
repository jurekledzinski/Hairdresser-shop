import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchOpenShop } from "../../../reduxStore/actions/actionFetchOpenShop";

import "./ContactOpenHours.scss";

const ContactOpenHours = () => {
  const dispatch = useDispatch();
  const dataOpenShop = useSelector((store) => store.openShopData);
  const { shop } = dataOpenShop;

  const dayOpenShop = shop.map((item) => (
    <p className="contact__day" key={item._id}>
      {item.day}
    </p>
  ));

  const timeOpenShop = shop.map((item) => (
    <p className="contact__time" key={item._id}>
      {item.time}
    </p>
  ));

  useEffect(() => {
    dispatch(fetchOpenShop());
  }, []);

  return (
    <div className="contact__hours-wrapper">
      <div className="contact__day-of-week">{dayOpenShop}</div>
      <div className="contact__time">{timeOpenShop}</div>
    </div>
  );
};

export default ContactOpenHours;
