import React, { useState } from "react";

import "./AdminGalleryImageRow.scss";

import AdminGalleryEditForm from "./AdminGalleryEditForm";

import useLoadBgImg from "../../../../customHooks/useLoadBgImg";
import CircleSpinner from "../../../others/spinner/CircleSpinner";

const AdminGalleryImageRow = ({
  _id,
  imageUrl,
  idImage,
  imgUrl,
  imamgeNewEditLink,
  currentImages,
  setCurrentImages,
  setImage,
  setIsOpenModal,
  setIsSubmit,
  title,
  type,
}) => {
  const [idRow, setIdRow] = useState("");
  const [isVisiblePanel, setIsVisiblePanel] = useState(false);

  const isLoad = useLoadBgImg(imageUrl);

  const handleDeleteImage = () => {
    setIdRow(_id);
    setImage(_id);
    imgUrl.current = imageUrl;
    setIsOpenModal(true);
    setIsVisiblePanel(false);
  };

  const handleEditImage = () => {
    setIsVisiblePanel((prevValue) => !prevValue);
    setImage("");
    setIdRow(_id);
  };

  return (
    <div className="admin-gallery__row">
      <div className="admin-gallery__row-image">
        <div
          className="admin-gallery__image-frame"
          style={{ backgroundImage: `url(${imageUrl})` }}
        >
          {!isLoad && (
            <div className="admin-gallery__overlay">
              <CircleSpinner />
            </div>
          )}
        </div>
        <div className="admin-gallery__buttons-wrapper">
          <button
            className={
              isVisiblePanel
                ? "admin-gallery__edit admin-gallery__edit--active"
                : "admin-gallery__edit"
            }
            onClick={handleEditImage}
          >
            <i className="far fa-edit"></i>
          </button>
          <button
            className={
              idImage === idRow && idImage && idRow !== ""
                ? "admin-gallery__delete admin-gallery__delete--active"
                : "admin-gallery__delete"
            }
            onClick={handleDeleteImage}
          >
            <i className="far fa-trash-alt"></i>
          </button>
        </div>
      </div>
      <div
        className={
          isVisiblePanel
            ? "admin-gallery__panel-edit admin-gallery__panel-edit--active"
            : "admin-gallery__panel-edit"
        }
      >
        <AdminGalleryEditForm
          currentImages={currentImages}
          setCurrentImages={setCurrentImages}
          setIsVisiblePanel={setIsVisiblePanel}
          setIsSubmit={setIsSubmit}
          idRow={idRow}
          imageUrl={imageUrl}
          title={title}
          type={type}
          imamgeNewEditLink={imamgeNewEditLink}
        />
      </div>
    </div>
  );
};

export default AdminGalleryImageRow;
