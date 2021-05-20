import {
  ADD_PAYMENT_SHOP,
  CLEAR_PAYMENT_SHOP,
  REMOVE_PAYMENT_SHOP,
} from "../actions/actionPaymentsMonthShop";

export const paymentsShopReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_PAYMENT_SHOP:
      return [...state, action.payload];
    case REMOVE_PAYMENT_SHOP:
      return state.filter((item, index) => {
        if (index === action.payload.index) {
        }
      });
    case CLEAR_PAYMENT_SHOP:
      return [];
    default:
      return state;
  }
};
