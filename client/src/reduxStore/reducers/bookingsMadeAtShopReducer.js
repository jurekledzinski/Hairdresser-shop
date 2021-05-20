import {
  ADD_BOOKING_SHOP,
  CLEAR_BOOKING_SHOP,
  REMOVE_BOOKING_SHOP,
} from "../actions/actionBookingsMadeAtShop";

export const bookingsMadeAtShopReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_BOOKING_SHOP:
      return [...state, action.payload];
    case REMOVE_BOOKING_SHOP:
      return state.filter((item, index) => {
        if (index === action.payload.index) {
        }
      });
    case CLEAR_BOOKING_SHOP:
      return [];
    default:
      return state;
  }
};
