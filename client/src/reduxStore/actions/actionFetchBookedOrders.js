import { getBookingBooked } from "../../utils/sessions";

export const FETCH_BOOKED_ORDERS_REQUEST = "FETCH_BOOKED_ORDERS_REQUEST";
export const FETCH_BOOKED_ORDERS_SUCCESS = "FETCH_BOOKED_ORDERS_SUCCESS";
export const FETCH_BOOKED_ORDERS_FAILURE = "FETCH_BOOKED_ORDERS_FAILURE";
export const CLEAR_BOOKED_ORDERS = "CLEAR_BOOKED_ORDERS";

export const fetchOrdersBookedRequest = () => ({
  type: FETCH_BOOKED_ORDERS_REQUEST,
});

const fetchOrdersBookedSuccess = (orders) => ({
  type: FETCH_BOOKED_ORDERS_SUCCESS,
  payload: orders,
});

const fetchOrderBookedFailure = (error) => ({
  type: FETCH_BOOKED_ORDERS_FAILURE,
  payload: error,
});

export const clearFetchedOrdersBooked = () => ({
  type: CLEAR_BOOKED_ORDERS,
});

export const fetchAllBookedOrders = () => {
  return async (dispatch) => {
    await dispatch(fetchOrdersBookedRequest());
    const { data, status } = await getBookingBooked();

    if (status === 200) {
      await dispatch(fetchOrdersBookedSuccess(data));
    } else {
      const errorMessage = "Failed to fetch data";
      await dispatch(fetchOrderBookedFailure(errorMessage));
    }
  };
};
