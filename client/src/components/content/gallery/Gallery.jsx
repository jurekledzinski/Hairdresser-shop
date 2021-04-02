import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import { addSingleSection } from "../../../reduxStore/actions/actionScroll";

import GalleryImages from "./GalleryImages";

import GallerySlider from "./GallerySlider";

import "./Gallery.scss";

const Gallery = () => {
  const galleryRef = useRef(null);
  const dispatch = useDispatch();

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
          <div className="gallery__buttons-top">
            <button className="gallery__button-men">Men</button>
            <button className="gallery__button-women">Women</button>
            <button className="gallery__button-children">Children</button>
          </div>
          <div className="gallery__buttons-bottom">
            <button className="gallery__button-weddings">Weddings</button>
            <button className="gallery__button-others">Others</button>
          </div>
        </div>
        <GalleryImages />
        <GallerySlider />
      </div>
    </section>
  );
};

export default Gallery;
