import { getPaymentBookingsEachMonthShop } from "../../utils/sessions";

export const FETCH_PAYMENTS_MONTH_SHOP_REQUEST =
  "FETCH_PAYMENTS_MONTH_SHOP_REQUEST";
export const FETCH_PAYMENTS_MONTH_SHOP_SUCCESS =
  "FETCH_PAYMENTS_MONTH_SHOP_SUCCESS";
export const FETCH_PAYMENTS_MONTH_SHOP_FAILURE =
  "FETCH_PAYMENTS_MONTH_SHOP_FAILURE";
export const CLEAR_FETCH_PAYMENTS_MONTH_SHOP =
  "CLEAR_FETCH_PAYMENTS_MONTH_SHOP";

export const fetchPaymentsMonthShopRequest = () => ({
  type: FETCH_PAYMENTS_MONTH_SHOP_REQUEST,
});

const fetchPaymentsMonthShopSuccess = (payment) => ({
  type: FETCH_PAYMENTS_MONTH_SHOP_SUCCESS,
  payload: payment,
});

const fetchPaymentsMonthShopFailure = (error) => ({
  type: FETCH_PAYMENTS_MONTH_SHOP_FAILURE,
  payload: error,
});

export const clearFetchPaymentsMonthShop = () => ({
  type: CLEAR_FETCH_PAYMENTS_MONTH_SHOP,
});

export const fetchPaymentsMadeAtShop = () => {
  return async (dispatch) => {
    await dispatch(fetchPaymentsMonthShopRequest());
    const { data, status } = await getPaymentBookingsEachMonthShop();

    if (status === 200) {
      await dispatch(fetchPaymentsMonthShopSuccess(data));
    } else {
      const errorMessage = "Failed to fetch data";
      await dispatch(fetchPaymentsMonthShopFailure(errorMessage));
    }
  };
};
