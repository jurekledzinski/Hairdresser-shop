import React, { useState } from "react";

import Modal from "../../others/modal/Modal";

import "./GallerySlider.scss";

const GallerySlider = () => {
  const [checkCanCloseModalByClick, setCheckCanCloseModalByClick] = useState(
    false
  );

  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleCloseModalByButton = () => {
    setIsOpenModal(false);
    setCheckCanCloseModalByClick(true);
    console.log("Click button close");
  };

  return (
    <Modal
      cantCloseWhenClickModal={checkCanCloseModalByClick}
      isOpen={isOpenModal}
    >
      <section className="gallery-slider">
        <button
          className="gallery-slider__close-button"
          onClick={handleCloseModalByButton}
        >
          <i className="far fa-window-close"></i>
        </button>
        <div className="gallery-slider__wrapper"></div>
        <div className="gallery-slider__buttons-wrapper">
          <div className="gallery-slider__buttons-top">
            <div className="gallery-slider__buttons-group">
              <button className="gallery-slider__button">Men</button>
              <button className="gallery-slider__button">Women</button>
            </div>
            <button className="gallery-slider__button gallery-slider__button--margin">
              Children
            </button>
          </div>
          <div className="gallery-slider__buttons-bottom">
            <button className="gallery-slider__button">Weddings</button>
            <button className="gallery-slider__button">Others</button>
          </div>
        </div>
      </section>
    </Modal>
  );
};

export default GallerySlider;
