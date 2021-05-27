import {
  ADD_BOOKING_SHOP,
  CLEAR_BOOKING_SHOP,
  DECREASE_BOOKING_SHOP_CHART,
  INCREASE_BOOKING_SHOP_CHART,
} from "../actions/actionBookingsMadeAtShop";

export const bookingsMadeAtShopReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_BOOKING_SHOP:
      return [...state, action.payload];
    case DECREASE_BOOKING_SHOP_CHART:
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
    case INCREASE_BOOKING_SHOP_CHART:
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
    case CLEAR_BOOKING_SHOP:
      return [];
    default:
      return state;
  }
};
