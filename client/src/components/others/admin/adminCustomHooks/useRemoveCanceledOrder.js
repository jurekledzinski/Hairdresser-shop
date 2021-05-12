import React from "react";
import { useDispatch } from "react-redux";

import {
  addServerErrorMessage,
  addServerSuccessMessage,
} from "../../../../reduxStore/actions/actionAlertsMessages";

import { deleteCanceledOrder } from "../../../../utils/sessions";

import { removeCanceledOrder } from "../../../../reduxStore/actions/actionCanceledOrders";

const useRemoveCanceledOrder = (
  idOrderCanceled,
  idCancelOrder,
  setIsOpenModal
) => {
  const dispatch = useDispatch();

  const handleRemoveItem = async () => {
    const { data, status } = await deleteCanceledOrder(idOrderCanceled);
    console.log(data, status);

    if (status === 200) {
      dispatch(addServerSuccessMessage(data.success, "removeAtTableAdmin"));
      dispatch(removeCanceledOrder(idOrderCanceled));
      setIsOpenModal(false);
    } else {
      dispatch(addServerErrorMessage(data.alert, "removeAtTableAdmin"));
    }
  };

  return { handleRemoveItem };
};

export default useRemoveCanceledOrder;
