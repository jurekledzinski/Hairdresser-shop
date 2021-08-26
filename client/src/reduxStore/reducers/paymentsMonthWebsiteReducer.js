import {
  ADD_PAYMENT_WEBSITE,
  CLEAR_PAYMENT_WEBSITE,
  DECREASE_PAYMENT_WEBSITE_CHART,
  INCREASE_PAYMENT_WEBSITE_CHART,
} from "../actions/actionPaymentsMonthWebsite";

export const paymentsWebsiteReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_PAYMENT_WEBSITE:
      return [...state, action.payload];
    case DECREASE_PAYMENT_WEBSITE_CHART:
      return state.map((item1) => {
        return {
          ...item1,
          total: item1.total.map((item2, index) => {
            if (index === action.payload.index && item2 > 0) {
              return (item2 = 0
                ? 0
                : Math.round((item2 - action.payload.money) * 100) / 100);
            }
            return item2;
          }),
        };
      });
    case INCREASE_PAYMENT_WEBSITE_CHART:
      return state.map((item1) => {
        return {
          ...item1,
          total: item1.total.map((item2, index) => {
            if (index === action.payload.index && item2 >= 0) {
              return (item2 = item2 + action.payload.money);
            }
            return item2;
          }),
        };
      });
    case CLEAR_PAYMENT_WEBSITE:
      return [];
    default:
      return state;
  }
};
