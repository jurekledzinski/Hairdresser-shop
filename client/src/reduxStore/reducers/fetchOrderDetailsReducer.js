import {
  FETCH_BOOKING_USER_REQUEST,
  FETCH_BOOKING_USER_SUCCESS,
  FETCH_BOOKING_USER_FAILURE,
} from "../actions/actionFetchOrderDetails";

const initialState = {
  loading: false,
  bookingUser: [],
  error: "",
};

export const fetchBookingUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BOOKING_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_BOOKING_USER_SUCCESS:
      return {
        loading: false,
        bookingUser: action.payload,
        error: "",
      };
    case FETCH_BOOKING_USER_FAILURE:
      return {
        loading: false,
        bookingUser: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
