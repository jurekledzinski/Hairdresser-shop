import {
  FETCH_BOOKINGS_MONTH_WEBSITE_REQUEST,
  FETCH_BOOKINGS_MONTH_WEBSITE_SUCCESS,
  FETCH_BOOKINGS_MONTH_WEBSITE_FAILURE,
  CLEAR_BOOKINGS_MONTH_WEBSITE,
} from "../actions/actionFetchAmountBookingsPerMonthInWebsite";

const initialState = {
  loading: false,
  bookingsWebsite: [],
  error: "",
};

export const fetchAmountBookingsPerMonthWebsiteReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case FETCH_BOOKINGS_MONTH_WEBSITE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_BOOKINGS_MONTH_WEBSITE_SUCCESS:
      return {
        loading: false,
        bookingsWebsite: action.payload,
        error: "",
      };
    case FETCH_BOOKINGS_MONTH_WEBSITE_FAILURE:
      return {
        loading: false,
        bookingsWebsite: [],
        error: action.payload,
      };
    case CLEAR_BOOKINGS_MONTH_WEBSITE:
      return initialState;
    default:
      return state;
  }
};
