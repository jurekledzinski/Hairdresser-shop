import React, { Fragment } from "react";

const menServices = [
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

const womenServices = [
  { title: "Classic women’s haircuts", price: 3.25, id: "1" },
  { title: "Classic haircut long hair", price: 5.5, id: "2" },
  { title: "Classic haircut & hair washing", price: 7.5, id: "3" },
  { title: "Ladies’ fashion style cuts", price: 5.0, id: "4" },
  { title: "Trending celebrity-inspired hairstyles", price: 8.5, id: "5" },
  { title: "Short female haircuts", price: 10.5, id: "6" },
  { title: "Classic haircut and colour", price: 10.5, id: "7" },
  { title: "Balayage colour", price: 6.5, id: "8" },
  { title: "Hair extensions", price: 4.5, id: "9" },
  { title: "Keratin hair treatments", price: 3.5, id: "10" },
  { title: "Stylization haircut", price: 2.5, id: "11" },
  { title: "Hair washing", price: 5.0, id: "12" },
];

const slidesMenOne = menServices.slice(0, 4);
const slidesWomenOne = womenServices.slice(0, 4);
const slidesMenTwo = menServices.slice(4, 8);
const slidesWomenTwo = womenServices.slice(4, 8);
const slidesMenThree = menServices.slice(8, 12);
const slidesWomenThree = womenServices.slice(8, 12);

const ServiceCards = ({
  checkSizeWindow,
  chooseGenderMobile,
  isServiceMenOrWomen,
  sizeWindow,
}) => {
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
              {slidesMenOne.map((serviceMen, index) => (
                <Fragment key={serviceMen.id}>
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
              {slidesWomenOne.map((serviceWomen, index) => (
                <Fragment key={serviceWomen.id}>
                  <p className="service__service-title">{serviceWomen.title}</p>
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
              {slidesMenTwo.map((serviceMen, index) => (
                <Fragment key={serviceMen.id}>
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
              {slidesWomenTwo.map((serviceWomen, index) => (
                <Fragment key={serviceWomen.id}>
                  <p className="service__service-title">{serviceWomen.title}</p>
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
              {slidesMenThree.map((serviceMen, index) => (
                <Fragment key={serviceMen.id}>
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
              {slidesWomenThree.map((serviceWomen, index) => (
                <Fragment key={serviceWomen.id}>
                  <p className="service__service-title">{serviceWomen.title}</p>
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
