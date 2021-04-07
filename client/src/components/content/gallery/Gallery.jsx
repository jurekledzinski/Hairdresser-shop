import React, { useEffect, useRef, useState } from "react";

import { useDispatch } from "react-redux";
import { addSingleSection } from "../../../reduxStore/actions/actionScroll";

import GalleryImages from "./GalleryImages";
import GallerySlider from "./GallerySlider";

import { buttonsGallerySlider } from "./GallerySliderButtons";

import "./Gallery.scss";

const Gallery = () => {
  const [clickedImgIndex, setClikedImgIndex] = useState(0);
  const [indexBtn, setIndexBtn] = useState(0);
  const [turnOffTransitionSlider, setTurnOffTransitionSlider] = useState(false);
  const galleryRef = useRef(null);
  const dispatch = useDispatch();

  const handleChooseTypeImages = (index) => {
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
              onClick={() => handleChooseTypeImages(index)}
            >
              {item.text}
            </button>
          ))}
        </div>
        <GalleryImages
          indexBtn={indexBtn}
          handleOpenSliderModal={handleOpenSliderModal}
        />
        <GallerySlider
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
