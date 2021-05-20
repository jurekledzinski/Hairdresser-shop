import React, { useState } from "react";

import "./AdminServiceRow.scss";

import AdminServiceEditForm from "./AdminServiceEditForm";

import useLoadBgImg from "../../../../customHooks/useLoadBgImg";
import CircleSpinner from "../../../others/spinner/CircleSpinner";

const AdminServiceRow = ({
  _id,
  idService,
  imageUrl,
  imgUrl,
  imamgeNewEditLink,
  currentServices,
  setCurrentServices,
  setIdService,
  setIsOpenModal,
  setIsSubmit,
  title,
  price,
}) => {
  const [idRow, setIdRow] = useState("");
  const [isVisiblePanel, setIsVisiblePanel] = useState(false);

  const isLoad = useLoadBgImg(imageUrl);

  const handleDeleteService = () => {
    setIdRow(_id);
    setIdService(_id);
    setIsOpenModal(true);
    setIsVisiblePanel(false);
    imgUrl.current = imageUrl;
  };

  const handleEditService = () => {
    setIsVisiblePanel((prevValue) => !prevValue);
    setIdService("");
    setIdRow(_id);
  };

  return (
    <div className="admin-service__row">
      <div className="admin-service__row-service">
        <div
          className="admin-service__image-frame"
          style={{ backgroundImage: `url(${imageUrl})` }}
        >
          {!isLoad && (
            <div className="admin-service__overlay">
              <CircleSpinner />
            </div>
          )}
        </div>
        <div className="admin-service__text-wrapper">
          <p className="admin-service__text-span-1">Service:</p>
          <p className="admin-service__text-1"> {title}</p>
        </div>
        <div className="admin-service__text-wrapper">
          <p className="admin-service__text-span-2">Price:</p>
          <p className="admin-service__text-2">{price.toFixed(2)}€</p>
        </div>
        <div className="admin-service__buttons-wrapper">
          <button
            className={
              isVisiblePanel
                ? "admin-service__edit admin-service__edit--active"
                : "admin-service__edit"
            }
            onClick={handleEditService}
          >
            <i className="far fa-edit"></i>
          </button>
          <button
            className={
              idService === idRow && idService && idRow !== ""
                ? "admin-service__delete admin-service__delete--active"
                : "admin-service__delete"
            }
            onClick={handleDeleteService}
          >
            <i className="far fa-trash-alt"></i>
          </button>
        </div>
      </div>
      <div
        className={
          isVisiblePanel
            ? "admin-service__panel-edit admin-service__panel-edit--active"
            : "admin-service__panel-edit"
        }
      >
        <AdminServiceEditForm
          currentServices={currentServices}
          setCurrentServices={setCurrentServices}
          setIsVisiblePanel={setIsVisiblePanel}
          idRow={idRow}
          imamgeNewEditLink={imamgeNewEditLink}
          imageUrl={imageUrl}
          title={title}
          price={price}
          setIsSubmit={setIsSubmit}
        />
      </div>
    </div>
  );
};

export default AdminServiceRow;
