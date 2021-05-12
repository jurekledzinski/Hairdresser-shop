import React from "react";
import { useDispatch } from "react-redux";

import {
  addServerErrorMessage,
  addServerSuccessMessage,
} from "../../../../reduxStore/actions/actionAlertsMessages";

import {
  deleteBookedOrder,
  deleteExcludedDateCancelCode,
} from "../../../../utils/sessions";

import { removeBookedOrder } from "../../../../reduxStore/actions/actionBookedOrders";

const useRemoveBookedOrder = (idBookedOrder, idCancelOrder, setIsOpenModal) => {
  const dispatch = useDispatch();

  const handleRemoveItem = async () => {
    const { data, status } = await deleteBookedOrder(idBookedOrder);
    await deleteExcludedDateCancelCode(idCancelOrder);
    console.log(data, status);

    if (status === 200) {
      dispatch(addServerSuccessMessage(data.success, "removeAtTableAdmin"));
      dispatch(removeBookedOrder(idBookedOrder));
      setIsOpenModal(false);
    } else {
      dispatch(addServerErrorMessage(data.alert, "removeAtTableAdmin"));
    }
  };

  return { handleRemoveItem };
};

export default useRemoveBookedOrder;
