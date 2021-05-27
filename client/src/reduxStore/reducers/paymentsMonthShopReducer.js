import {
  ADD_PAYMENT_SHOP,
  CLEAR_PAYMENT_SHOP,
  DECREASE_PAYMENT_SHOP_CHART,
  INCREASE_PAYMENT_SHOP_CHART,
} from "../actions/actionPaymentsMonthShop";

export const paymentsShopReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_PAYMENT_SHOP:
      return [...state, action.payload];
    case DECREASE_PAYMENT_SHOP_CHART:
      return state.map((item1) => {
        return {
          ...item1,
          total: item1.total.map((item2, index) => {
            if (index === action.payload.index && item2 > 0) {
              return (item2 = item2 - action.payload.money);
            }
            return item2;
          }),
        };
      });
    case INCREASE_PAYMENT_SHOP_CHART:
      return state.map((item1) => {
        return {
          ...item1,
          total: item1.total.map((item2, index) => {
            if (index === action.payload.index && item2 > 0) {
              return (item2 = item2 + action.payload.money);
            }
            return item2;
          }),
        };
      });
    case CLEAR_PAYMENT_SHOP:
      return [];
    default:
      return state;
  }
};
