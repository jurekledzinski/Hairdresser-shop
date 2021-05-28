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

import { removeExcludTimes } from "../../../../reduxStore/actions/actionExcludedTimes";
import { removeBookedOrder } from "../../../../reduxStore/actions/actionBookedOrders";
import { removeBookingMonthShop } from "../../../../reduxStore/actions/actionBookingsMadeAtShop";
import { removeBookingMonthWebsite } from "../../../../reduxStore/actions/actionBookingsMadeAtWebsite";
import { removePaymentsMonthShop } from "../../../../reduxStore/actions/actionPaymentsMonthShop";
import { removePaymentsMonthWebsite } from "../../../../reduxStore/actions/actionPaymentsMonthWebsite";
import { fetchAllTimesExcluded } from "../../../../reduxStore/actions/actionFetchExcludedTimes";

const useRemoveBookedOrder = (
  bookingId,
  idBookedOrder,
  idCancelOrder,
  setIsOpenModal
) => {
  const dispatch = useDispatch();

  const handleRemoveItem = async () => {
    const { data, status } = await deleteBookedOrder(idBookedOrder);
    await deleteExcludedDateCancelCode(idCancelOrder);

    if (status === 200) {
      const indexMonthInTabel = new Date(data.result.dataPayed).getMonth();
      const placeBooking = data.result.bookingWhere;
      const priceOrder = data.result.totalPrice;

      switch (placeBooking) {
        case "Shop":
          dispatch(removeBookingMonthShop(indexMonthInTabel));
          dispatch(removePaymentsMonthShop(indexMonthInTabel, priceOrder));
          break;
        case "Website":
          dispatch(removeBookingMonthWebsite(indexMonthInTabel));
          dispatch(removePaymentsMonthWebsite(indexMonthInTabel, priceOrder));
        default:
          break;
      }
      dispatch(addServerSuccessMessage(data.success, "removeAtTableAdmin"));
      dispatch(removeBookedOrder(idBookedOrder));
      dispatch(removeExcludTimes(bookingId));
      dispatch(fetchAllTimesExcluded());
      setIsOpenModal(false);
    } else {
      dispatch(addServerErrorMessage(data.alert, "removeAtTableAdmin"));
    }
  };

  return { handleRemoveItem };
};

export default useRemoveBookedOrder;
