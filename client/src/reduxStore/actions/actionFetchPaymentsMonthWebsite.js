import { getPaymentBookingsEachMonthWebsite } from "../../utils/sessions";

export const FETCH_PAYMENTS_MONTH_WEBSITE_REQUEST =
  "FETCH_PAYMENTS_MONTH_WEBSITE_REQUEST";
export const FETCH_PAYMENT_MONTH_WEBSITE_SUCCESS =
  "FETCH_PAYMENT_MONTH_WEBSITE_SUCCESS";
export const FETCH_PAYMENT_MONTH_WEBSITE_FAILURE =
  "FETCH_PAYMENT_MONTH_WEBSITE_FAILURE";
export const CLEAR_FETCH_PAYMENT_MONTH_WEBSITE =
  "CLEAR_FETCH_PAYMENT_MONTH_WEBSITE";

export const fetchPaymentsMonthWebsiteRequest = () => ({
  type: FETCH_PAYMENTS_MONTH_WEBSITE_REQUEST,
});

const fetchPaymentsMonthWebsiteSuccess = (payment) => ({
  type: FETCH_PAYMENT_MONTH_WEBSITE_SUCCESS,
  payload: payment,
});

const fetchPaymentsMonthWebsiteFailure = (error) => ({
  type: FETCH_PAYMENT_MONTH_WEBSITE_FAILURE,
  payload: error,
});

export const clearFetchPaymentsMonthWebsite = () => ({
  type: CLEAR_FETCH_PAYMENT_MONTH_WEBSITE,
});

export const fetchPaymentsMadeAtWebsite = () => {
  return async (dispatch) => {
    await dispatch(fetchPaymentsMonthWebsiteRequest());
    const { data, status } = await getPaymentBookingsEachMonthWebsite();

    if (status === 200) {
      await dispatch(fetchPaymentsMonthWebsiteSuccess(data));
    } else {
      const errorMessage = "Failed to fetch data";
      await dispatch(fetchPaymentsMonthWebsiteFailure(errorMessage));
    }
  };
};
