import React, { useState } from "react";

import "./AdminShopRow.scss";

import AdminShopEditForm from "./AdminShopEditForm";

const AdminShopRow = ({
  _id,
  idOpenShop,
  currentOpenShop,
  setCurrentOpenShop,
  setIdOpenShop,
  setIsOpenModal,
  day,
  time,
}) => {
  const [idRow, setIdRow] = useState("");
  const [isVisiblePanel, setIsVisiblePanel] = useState(false);

  const handleDeleteService = () => {
    setIdRow(_id);
    setIdOpenShop(_id);
    setIsOpenModal(true);
    setIsVisiblePanel(false);
  };

  const handleEditService = () => {
    setIsVisiblePanel((prevValue) => !prevValue);
    setIdOpenShop("");
    setIdRow(_id);
  };

  console.log(day, time, " row");

  return (
    <div className="admin-shop__row">
      <div className="admin-shop__row-service">
        <div className="admin-shop__text-wrapper">
          <p className="admin-shop__text-span-1">Day:</p>
          <p className="admin-shop__text-1"> {day}</p>
        </div>
        <div className="admin-shop__text-wrapper">
          <p className="admin-shop__text-span-2">Time:</p>
          <p className="admin-shop__text-2">{time}</p>
        </div>
        <div className="admin-shop__buttons-wrapper">
          <button
            className={
              isVisiblePanel
                ? "admin-shop__edit admin-shop__edit--active"
                : "admin-shop__edit"
            }
            onClick={handleEditService}
          >
            <i className="far fa-edit"></i>
          </button>
          <button
            className={
              idOpenShop === idRow && idOpenShop && idRow !== ""
                ? "admin-shop__delete admin-shop__delete--active"
                : "admin-shop__delete"
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
            ? "admin-shop__panel-edit admin-shop__panel-edit--active"
            : "admin-shop__panel-edit"
        }
      >
        <AdminShopEditForm
          currentOpenShop={currentOpenShop}
          setCurrentOpenShop={setCurrentOpenShop}
          setIsVisiblePanel={setIsVisiblePanel}
          idRow={idRow}
          day={day}
          time={time}
        />
      </div>
    </div>
  );
};

export default AdminShopRow;
