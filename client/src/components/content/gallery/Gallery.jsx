import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import { addSingleSection } from "../../../reduxStore/actions/actionScroll";

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
        <div className="gallery__images-wrapper">
          <span className="gallery__below-cover-1"></span>
          <span className="gallery__below-cover-2"></span>
          <span className="gallery__below-cover-3"></span>
          <div className="gallery__image-1">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/hairdress-shop.appspot.com/o/Menhaircut1.jpg?alt=media&token=2ba2839a-332d-4a69-a58d-c0c7d6ad8e0c"
              alt="Men haircut"
              className="gallery__img"
            />
          </div>
          <div className="gallery__image-2">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/hairdress-shop.appspot.com/o/Menhaircut2.jpg?alt=media&token=3b79b25d-70ae-4325-b3e5-1889fd76d483"
              alt="Men haircut"
              className="gallery__img"
            />
          </div>
          <div className="gallery__image-3">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/hairdress-shop.appspot.com/o/Menhaircut3.jpg?alt=media&token=dd3e1ff4-bb0d-4020-91bf-76b40fcc1844"
              alt="Men haircut"
              className="gallery__img"
            />
          </div>
          <div className="gallery__image-4">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/hairdress-shop.appspot.com/o/Menhaircut9.jpg?alt=media&token=e768c680-4272-4920-a1d0-87ee33581011"
              alt="Men haircut"
              className="gallery__img"
            />
          </div>
          <div className="gallery__image-5">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/hairdress-shop.appspot.com/o/Menhaircut5.jpg?alt=media&token=c43f9b91-6bc6-4a71-abf4-0c43c4f3ee7b"
              alt="Men haircut"
              className="gallery__img"
            />
          </div>
          <div className="gallery__image-6">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/hairdress-shop.appspot.com/o/Menhaircut6.jpg?alt=media&token=84defef4-4997-4baf-8de9-1bfb3a633de5"
              alt="Men haircut"
              className="gallery__img"
            />
          </div>
          <div className="gallery__image-7">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/hairdress-shop.appspot.com/o/Menhaircut7.jpg?alt=media&token=db3c8764-4bd4-42ee-916b-5838bae3ad74"
              alt="Men haircut"
              className="gallery__img"
            />
          </div>
          <div className="gallery__image-8">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/hairdress-shop.appspot.com/o/Menhaircut8.jpg?alt=media&token=20dfcce0-056f-4a2f-9801-b3681a8bfadf"
              alt="Men haircut"
              className="gallery__img"
            />
          </div>
          <div className="gallery__image-9">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/hairdress-shop.appspot.com/o/Menhaircut4.jpg?alt=media&token=ddea3e31-de15-485e-9f6a-91b217a889b9"
              alt="Men haircut"
              className="gallery__img"
            />
          </div>
          <div className="gallery__image-10">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/hairdress-shop.appspot.com/o/Menhaircut10.jpg?alt=media&token=f60b7442-5248-41d2-876e-77840289efae"
              alt="Men haircut"
              className="gallery__img"
            />
          </div>
          <div className="gallery__image-11">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/hairdress-shop.appspot.com/o/Menhaircut11.jpg?alt=media&token=e19ad2ed-876f-4f75-b931-d1359ea6d642"
              alt="Men haircut"
              className="gallery__img"
            />
          </div>
          <div className="gallery__image-12">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/hairdress-shop.appspot.com/o/Menhaircut12.jpg?alt=media&token=f6cc3701-8222-491d-a4bf-22ad3c57b4c3"
              alt="Men haircut"
              className="gallery__img"
            />
          </div>
          <div className="gallery__image-13">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/hairdress-shop.appspot.com/o/Menhaircut13.jpg?alt=media&token=79722030-3213-4210-b01d-b64e8460c6ca"
              alt="Men haircut"
              className="gallery__img"
            />
          </div>
          <div className="gallery__image-14">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/hairdress-shop.appspot.com/o/Menhaircut14.jpg?alt=media&token=8612ece4-abb7-4b95-bfd6-4a0cb0110876"
              alt="Men haircut"
              className="gallery__img"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
