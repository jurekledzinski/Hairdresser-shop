import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchAllCurrentServices } from "../../../reduxStore/actions/actionFetchAllServices";

const ServiceCards = ({
  checkSizeWindow,
  chooseGenderMobile,
  isServiceMenOrWomen,
  sizeWindow,
}) => {
  const dispatch = useDispatch();
  const dataAllServices = useSelector((store) => store.allServicesData);
  const { allServices } = dataAllServices;
  const [slideMenOne, setSlideMenOne] = useState([]);
  const [slideWomenOne, setSlideWomenOne] = useState([]);
  const [slideMenTwo, setSlideMenTwo] = useState([]);
  const [slideWomenTwo, setSlideWomenTwo] = useState([]);
  const [slideMenThree, setSlideMenThree] = useState([]);
  const [slideWomenThree, setSlideWomenThree] = useState([]);

  useEffect(() => {
    dispatch(fetchAllCurrentServices());
  }, []);

  useEffect(() => {
    if (allServices.length > 0) {
      const filterMen = allServices.filter((item) => item.gender === "men");
      const filterWomen = allServices.filter((item) => item.gender === "women");
      const slidesMenOne = filterMen.slice(0, 4);
      const slidesWomenOne = filterWomen.slice(0, 4);
      const slidesMenTwo = filterMen.slice(4, 8);
      const slidesWomenTwo = filterWomen.slice(4, 8);
      const slidesMenThree = filterMen.slice(8, 12);
      const slidesWomenThree = filterWomen.slice(8, 12);
      setSlideMenOne(slidesMenOne);
      setSlideWomenOne(slidesWomenOne);
      setSlideMenTwo(slidesMenTwo);
      setSlideWomenTwo(slidesWomenTwo);
      setSlideMenThree(slidesMenThree);
      setSlideWomenThree(slidesWomenThree);
    }
  }, [allServices]);

  return (
    <Fragment>
      <div
        className={
          checkSizeWindow >= sizeWindow.current
            ? isServiceMenOrWomen
              ? "service__plan-cut service__plan-cut--active"
              : "service__plan-cut"
            : "service__plan-cut"
        }
      >
        <div
          className={
            checkSizeWindow >= sizeWindow.current
              ? isServiceMenOrWomen
                ? "service__inner-card service__inner-card--active"
                : "service__inner-card"
              : "service__inner-card"
          }
        >
          <div className="service__card-front">
            <div className="service__card-front-top">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/hairdress-shop.appspot.com/o/Icon-cut.png?alt=media&token=c9167ab8-b4ac-4999-a20f-7d94b5b1bd86"
                alt="Icon"
                className="service__icon-img"
              />
            </div>
            <div className="service__card-front-bottom">
              {slideMenOne.length > 0 &&
                slideMenOne.map((serviceMen, index) => (
                  <Fragment key={serviceMen._id}>
                    <p className="service__service-title">{serviceMen.title}</p>
                    <span className="service__service-price">
                      {serviceMen.price}€
                    </span>
                  </Fragment>
                ))}
            </div>
          </div>
          <div
            className={
              checkSizeWindow >= sizeWindow.current
                ? "service__card-back"
                : chooseGenderMobile
                ? "service__card-back service__card-back--active"
                : "service__card-back"
            }
          >
            <div className="service__card-back-top">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/hairdress-shop.appspot.com/o/Icon-cut-woman.png?alt=media&token=652ce079-ba35-4ba3-8fa2-5dc57010a8da"
                alt="Icon"
                className="service__icon-img"
              />
            </div>
            <div className="service__card-back-bottom">
              {slideWomenOne.length > 0 &&
                slideWomenOne.map((serviceWomen, index) => (
                  <Fragment key={serviceWomen._id}>
                    <p className="service__service-title">
                      {serviceWomen.title}
                    </p>
                    <span className="service__service-price">
                      {serviceWomen.price}€
                    </span>
                  </Fragment>
                ))}
            </div>
          </div>
        </div>
      </div>
      <div
        className={
          checkSizeWindow >= sizeWindow.current
            ? isServiceMenOrWomen
              ? "service__plan-cut service__plan-cut--active"
              : "service__plan-cut"
            : "service__plan-cut"
        }
      >
        <div
          className={
            checkSizeWindow >= sizeWindow.current
              ? isServiceMenOrWomen
                ? "service__inner-card service__inner-card--active"
                : "service__inner-card"
              : "service__inner-card"
          }
        >
          <div className="service__card-front">
            <div className="service__card-front-top">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/hairdress-shop.appspot.com/o/Icon-razor.png?alt=media&token=330e5dab-c22a-4dcf-ba75-762a3c3de784"
                alt="Icon"
                className="service__icon-img"
              />
            </div>
            <div className="service__card-front-bottom">
              {slideMenTwo.length > 0 &&
                slideMenTwo.map((serviceMen, index) => (
                  <Fragment key={serviceMen._id}>
                    <p className="service__service-title">{serviceMen.title}</p>
                    <span className="service__service-price">
                      {serviceMen.price}€
                    </span>
                  </Fragment>
                ))}
            </div>
          </div>
          <div
            className={
              checkSizeWindow >= sizeWindow.current
                ? "service__card-back"
                : chooseGenderMobile
                ? "service__card-back service__card-back--active"
                : "service__card-back"
            }
          >
            <div className="service__card-back-top">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/hairdress-shop.appspot.com/o/Icon-brush.png?alt=media&token=a508bed4-5159-424d-8bc8-56610c397b51"
                alt="Icon"
                className="service__icon-img"
              />
            </div>
            <div className="service__card-back-bottom">
              {slideWomenTwo.length > 0 &&
                slideWomenTwo.map((serviceWomen, index) => (
                  <Fragment key={serviceWomen._id}>
                    <p className="service__service-title">
                      {serviceWomen.title}
                    </p>
                    <span className="service__service-price">
                      {serviceWomen.price}€
                    </span>
                  </Fragment>
                ))}
            </div>
          </div>
        </div>
      </div>
      <div
        className={
          checkSizeWindow >= sizeWindow.current
            ? isServiceMenOrWomen
              ? "service__plan-cut service__plan-cut--active"
              : "service__plan-cut"
            : "service__plan-cut"
        }
      >
        <div
          className={
            checkSizeWindow >= sizeWindow.current
              ? isServiceMenOrWomen
                ? "service__inner-card service__inner-card--active"
                : "service__inner-card"
              : "service__inner-card"
          }
        >
          <div className="service__card-front">
            <div className="service__card-front-top">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/hairdress-shop.appspot.com/o/Icon-dryer.png?alt=media&token=201b19a8-a662-4144-b7c9-df01ca861254"
                alt="Icon"
                className="service__icon-img"
              />
            </div>
            <div className="service__card-front-bottom">
              {slideMenThree.length > 0 &&
                slideMenThree.map((serviceMen, index) => (
                  <Fragment key={serviceMen._id}>
                    <p className="service__service-title">{serviceMen.title}</p>
                    <span className="service__service-price">
                      {serviceMen.price}€
                    </span>
                  </Fragment>
                ))}
            </div>
          </div>
          <div
            className={
              checkSizeWindow >= sizeWindow.current
                ? "service__card-back"
                : chooseGenderMobile
                ? "service__card-back service__card-back--active"
                : "service__card-back"
            }
          >
            <div className="service__card-back-top">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/hairdress-shop.appspot.com/o/Icon-wash.png?alt=media&token=a656c958-6ebb-4508-a135-0cc1ef17f11c"
                alt="Icon"
                className="service__icon-img"
              />
            </div>
            <div className="service__card-back-bottom">
              {slideWomenThree.length > 0 &&
                slideWomenThree.map((serviceWomen, index) => (
                  <Fragment key={serviceWomen._id}>
                    <p className="service__service-title">
                      {serviceWomen.title}
                    </p>
                    <span className="service__service-price">
                      {serviceWomen.price}€
                    </span>
                  </Fragment>
                ))}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ServiceCards;
