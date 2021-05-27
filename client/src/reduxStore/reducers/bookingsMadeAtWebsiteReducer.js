import {
  ADD_BOOKING_WEBSITE,
  CLEAR_BOOKING_WEBSITE,
  DECREASE_BOOKING_WEBSITE_CHART,
  INCREASE_BOOKING_WEBSITE_CHART,
} from "../actions/actionBookingsMadeAtWebsite";

export const bookingsMadeWebsiteReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_BOOKING_WEBSITE:
      return [...state, action.payload];
    case DECREASE_BOOKING_WEBSITE_CHART:
      return state.map((item1) => {
        return {
          ...item1,
          amount: item1.amount.map((item2, index) => {
            if (index === action.payload.index && item2 > 0) {
              return (item2 = item2 - 1);
            }
            return item2;
          }),
        };
      });
    case INCREASE_BOOKING_WEBSITE_CHART:
      return state.map((item1) => {
        return {
          ...item1,
          amount: item1.amount.map((item2, index) => {
            if (index === action.payload.index && item2 > 0) {
              return (item2 = item2 + 1);
            }
            return item2;
          }),
        };
      });
    case CLEAR_BOOKING_WEBSITE:
      return [];
    default:
      return state;
  }
};
