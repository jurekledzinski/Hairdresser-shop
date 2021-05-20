import {
  ADD_BOOKING_WEBSITE,
  CLEAR_BOOKING_WEBSITE,
  REMOVE_BOOKING_WEBSITE,
} from "../actions/actionBookingsMadeAtWebsite";

export const bookingsMadeWebsiteReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_BOOKING_WEBSITE:
      return [...state, action.payload];
    case REMOVE_BOOKING_WEBSITE:
      return state.filter((item, index) => {
        if (index === action.payload.index) {
        }
      });
    case CLEAR_BOOKING_WEBSITE:
      return [];
    default:
      return state;
  }
};
