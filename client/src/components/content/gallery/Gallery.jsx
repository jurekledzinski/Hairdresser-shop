import React, { useEffect, useRef, useState } from "react";

import { useDispatch } from "react-redux";
import { addSingleSection } from "../../../reduxStore/actions/actionScroll";

import GalleryImages from "./GalleryImages";
import GallerySlider from "./GallerySlider";

import { buttonsGallerySlider } from "./GallerySliderButtons";

import "./Gallery.scss";

const Gallery = () => {
  const [chooseButton, setChooseButton] = useState("men");
  const [clickedImgIndex, setClikedImgIndex] = useState(0);
  const [indexBtn, setIndexBtn] = useState(0);
  const [isLoadImg, setIsLoadImg] = useState(false);
  const [turnOffTransitionSlider, setTurnOffTransitionSlider] = useState(false);
  const galleryRef = useRef(null);
  const dispatch = useDispatch();

  const handleChooseTypeImages = (e, index) => {
    const nameBtn = e.target.innerHTML;
    setChooseButton(nameBtn.toLowerCase());
    setIndexBtn(index);
  };

  const handleOpenSliderModal = (indexPicture) => {
    setClikedImgIndex(indexPicture);
    setTurnOffTransitionSlider(true);
  };

  useEffect(() => {
    if (galleryRef.current) {
      dispatch(addSingleSection(galleryRef.current));
    }
  }, []);

  return (
    <section className="gallery" ref={galleryRef}>
      <div className="gallery__wrapper">
        <h2 className="gallery__title">Gallery</h2>
        <p className="gallery__subtitle">
          One should, nevertheless, consider that there is a direct relation
          between the entity integrity and the
        </p>
        <div className="gallery__buttons-wrapper">
          {buttonsGallerySlider.map((item, index) => (
            <button
              className={
                indexBtn === index
                  ? "gallery__button gallery__button--active"
                  : "gallery__button"
              }
              key={index}
              onClick={(e) => handleChooseTypeImages(e, index)}
            >
              {item.text}
            </button>
          ))}
        </div>
        <GalleryImages
          chooseButton={chooseButton}
          indexBtn={indexBtn}
          isLoadImg={isLoadImg}
          handleOpenSliderModal={handleOpenSliderModal}
          setIsLoadImg={setIsLoadImg}
        />
        <GallerySlider
          setChooseButton={setChooseButton}
          clickedImgCounter={clickedImgIndex}
          indexBtn={indexBtn}
          resetClickedImgIndex={setClikedImgIndex}
          setIndexBtn={setIndexBtn}
          setTurnOffTransitionSlider={setTurnOffTransitionSlider}
          turnOffTransitionSlider={turnOffTransitionSlider}
        />
      </div>
    </section>
  );
};

export default Gallery;
