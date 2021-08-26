import React from "react";
import { useDispatch } from "react-redux";

import {
  addServerErrorMessage,
  addServerSuccessMessage,
} from "../../../../reduxStore/actions/actionAlertsMessages";

import { deleteAdminOpenShop } from "../../../../utils/sessions";

const useRemoveOpenShop = (
  currentOpenShop,
  idOpenShop,
  setCurrentOpenShop,
  setIsOpenModal
) => {
  const dispatch = useDispatch();

  const deepCopyCurrentOpenShop = () => {
    let copy = [];
    currentOpenShop.forEach((item) => {
      const singleItem = { ...item };
      copy = [...copy, singleItem];
    });

    return copy;
  };

  const handleRemoveItem = async () => {
    const { data, status } = await deleteAdminOpenShop(idOpenShop);

    if (status === 200) {
      dispatch(addServerSuccessMessage(data.success, "removeAtTableAdmin"));
      let newCopy = deepCopyCurrentOpenShop();
      const updatedOpenShop = newCopy.filter((item) => item._id !== idOpenShop);
      setCurrentOpenShop(updatedOpenShop);
      setIsOpenModal(false);
    } else {
      dispatch(addServerErrorMessage(data.alert, "removeAtTableAdmin"));
    }
  };

  return { handleRemoveItem };
};

export default useRemoveOpenShop;
