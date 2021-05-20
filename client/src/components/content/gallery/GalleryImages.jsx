import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./GalleryImages.scss";

import { fetchGalleryImgs } from "../../../reduxStore/actions/actionFetchGalleryImages";
import { addImageGallery } from "../../../reduxStore/actions/actionGalleryImages";

import CircleSpinner from "../../others/spinner/CircleSpinner";

const GalleryImages = ({
  chooseButton,
  handleOpenSliderModal,
  indexBtn,
  isLoadImg,
  setIsLoadImg,
}) => {
  const dispatch = useDispatch();
  const dataImages = useSelector((store) => store.galleryImgData);
  const imagesGalleryData = useSelector((store) => store.galleryImagesData);
  const { images } = dataImages;

  const idTimeOut = useRef(null);
  const isMount = useRef(null);

  useEffect(() => {
    dispatch(fetchGalleryImgs(chooseButton));
  }, [chooseButton, dispatch]);

  useEffect(() => {
    if (isMount.current && images.length > 0) {
      dispatch(addImageGallery(images));
    }
  }, [chooseButton, images]);

  useEffect(() => {
    isMount.current = true;
    return () => {
      isMount.current = false;
      clearTimeout(idTimeOut.current);
    };
  }, []);

  useEffect(() => {
    setIsLoadImg(false);
  }, [indexBtn]);

  const handleOnloadImage = (e) => {
    idTimeOut.current = setTimeout(() => setIsLoadImg(true), 500);
  };

  return (
    <div className="gallery__images-wrapper">
      {isLoadImg && <span className="gallery__below-cover-1"></span>}
      {isLoadImg && <span className="gallery__below-cover-2"></span>}
      {isLoadImg && <span className="gallery__below-cover-3"></span>}
      {imagesGalleryData.map((item, index) => (
        <div className={`gallery__image-${index + 1}`} key={index}>
          <img
            src={item.imageUrl}
            alt={item.title}
            className="gallery__img"
            onClick={() => handleOpenSliderModal(index + 1)}
            onLoad={handleOnloadImage}
          />
          {!isLoadImg && (
            <div className="gallery-slider__overlay">
              <CircleSpinner />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default GalleryImages;
