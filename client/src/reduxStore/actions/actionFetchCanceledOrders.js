import { getBookingCanceled } from "../../utils/sessions";

export const FETCH_CANCELED_ORDERS_REQUEST = "FETCH_CANCELED_ORDERS_REQUEST";
export const FETCH_CANCELED_ORDERS_SUCCESS = "FETCH_CANCELED_ORDERS_SUCCESS";
export const FETCH_CANCELED_ORDERS_FAILURE = "FETCH_CANCELED_ORDERS_FAILURE";

export const fetchOrdersCanceledRequest = () => ({
  type: FETCH_CANCELED_ORDERS_REQUEST,
});

const fetchOrdersCanceledSuccess = (orders) => ({
  type: FETCH_CANCELED_ORDERS_SUCCESS,
  payload: orders,
});

const fetchOrderCanceledFailure = (error) => ({
  type: FETCH_CANCELED_ORDERS_FAILURE,
  payload: error,
});

export const fetchAllCanceledOrders = () => {
  return async (dispatch) => {
    await dispatch(fetchOrdersCanceledRequest());
    const { data, status } = await getBookingCanceled();

    if (status === 200) {
      await dispatch(fetchOrdersCanceledSuccess(data));
    } else {
      const errorMessage = "Failed to fetch data";
      await dispatch(fetchOrderCanceledFailure(errorMessage));
    }
  };
};
