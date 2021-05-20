import {
  FETCH_BOOKED_ORDERS_REQUEST,
  FETCH_BOOKED_ORDERS_SUCCESS,
  FETCH_BOOKED_ORDERS_FAILURE,
  CLEAR_BOOKED_ORDERS,
} from "../actions/actionFetchBookedOrders";

const initialState = {
  loading: false,
  allBookedOrders: [],
  error: "",
};

export const fetchAllBookedOrdersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BOOKED_ORDERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_BOOKED_ORDERS_SUCCESS:
      return {
        loading: false,
        allBookedOrders: action.payload,
        error: "",
      };
    case FETCH_BOOKED_ORDERS_FAILURE:
      return {
        loading: false,
        allBookedOrders: [],
        error: action.payload,
      };
    case CLEAR_BOOKED_ORDERS:
      return initialState;
    default:
      return state;
  }
};
