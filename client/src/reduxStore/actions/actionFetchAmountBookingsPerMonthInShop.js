import { getAmountBookingsEachMonthShop } from "../../utils/sessions";

export const FETCH_BOOKINGS_MONTH_SHOP_REQUEST =
  "FETCH_BOOKINGS_MONTH_SHOP_REQUEST";
export const FETCH_BOOKINGS_MONTH_SHOP_SUCCESS =
  "FETCH_BOOKINGS_MONTH_SHOP_SUCCESS";
export const FETCH_BOOKINGS_MONTH_SHOP_FAILURE =
  "FETCH_BOOKINGS_MONTH_SHOP_FAILURE";
export const CLEAR_FETCH_BOOKINGS_AMOUNT_MONTH_SHOP =
  "CLEAR_FETCH_BOOKINGS_AMOUNT_MONTH_SHOP";

export const fetchBookingsMonthShopRequest = () => ({
  type: FETCH_BOOKINGS_MONTH_SHOP_REQUEST,
});

const fetchBookingsMonthShopSuccess = (booking) => ({
  type: FETCH_BOOKINGS_MONTH_SHOP_SUCCESS,
  payload: booking,
});

const fetchBookingsMonthShopFailure = (error) => ({
  type: FETCH_BOOKINGS_MONTH_SHOP_FAILURE,
  payload: error,
});

export const clearFetchBookingAmountMonthShop = () => ({
  type: CLEAR_FETCH_BOOKINGS_AMOUNT_MONTH_SHOP,
});

export const fetchBookingsMadeAtShop = () => {
  return async (dispatch) => {
    await dispatch(fetchBookingsMonthShopRequest());
    const { data, status } = await getAmountBookingsEachMonthShop();

    if (status === 200) {
      await dispatch(fetchBookingsMonthShopSuccess(data));
    } else {
      const errorMessage = "Failed to fetch data";
      await dispatch(fetchBookingsMonthShopFailure(errorMessage));
    }
  };
};
