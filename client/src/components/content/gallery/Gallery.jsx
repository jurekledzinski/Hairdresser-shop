import React from "react";

import "./Gallery.scss";

const Gallery = () => {
  return (
    <section className="gallery">
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
          <div className="gallery__image-1">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/hairdress-shop.appspot.com/o/Menhaircut1.jpg?alt=media&token=2ba2839a-332d-4a69-a58d-c0c7d6ad8e0c"
              alt="Men haircut"
              className="gallery__img"
            />
          </div>
          <div className="gallery__image-2">Image 2</div>
          <div className="gallery__image-3">Image 3</div>
          <div className="gallery__image-4">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/hairdress-shop.appspot.com/o/Menhaircut9.jpg?alt=media&token=e768c680-4272-4920-a1d0-87ee33581011"
              alt="Men haircut"
              className="gallery__img"
            />
          </div>
          <div className="gallery__image-5">Image 5</div>
          <div className="gallery__image-6">Image 6</div>
          <div className="gallery__image-7">Image 7</div>
          <div className="gallery__image-8">Image 8</div>
          <div className="gallery__image-9">Image 9</div>
          <div className="gallery__image-10">Image 10</div>
          <div className="gallery__image-11">Image 11</div>
          <div className="gallery__image-12">Image 12</div>
          <div className="gallery__image-13">Image 13</div>
          <div className="gallery__image-14">Image 14</div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
