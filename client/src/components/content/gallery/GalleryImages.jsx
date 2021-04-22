import React, { useEffect, useState } from "react";

import "./GalleryImages.scss";

import { imgSliderMen } from "./Images";
import { imgSliderWomen } from "./Images";
import { imgSliderChildren } from "./Images";
import { imgSliderWeddings } from "./Images";
import { imgSliderOthers } from "./Images";

const GalleryImages = ({ handleOpenSliderModal, indexBtn }) => {
  const [imagesMainPage, setImagesMainPage] = useState(imgSliderMen);

  useEffect(() => {
    switch (indexBtn) {
      case 0:
        setImagesMainPage(imgSliderMen);
        break;
      case 1:
        setImagesMainPage(imgSliderWomen);
        break;
      case 2:
        setImagesMainPage(imgSliderChildren);
        break;
      case 3:
        setImagesMainPage(imgSliderWeddings);
        break;
      case 4:
        setImagesMainPage(imgSliderOthers);
        break;
      default:
        setImagesMainPage([]);
        break;
    }
  }, [indexBtn]);

  return (
    <div className="gallery__images-wrapper">
      <span className="gallery__below-cover-1"></span>
      <span className="gallery__below-cover-2"></span>
      <span className="gallery__below-cover-3"></span>
      {imagesMainPage.map((item, index) => (
        <div className={`gallery__image-${index + 1}`} key={index}>
          <img
            src={item.imagePath}
            alt={item.alt}
            className="gallery__img"
            onClick={() => handleOpenSliderModal(index + 1)}
          />
        </div>
      ))}
    </div>
  );
};

export default GalleryImages;
