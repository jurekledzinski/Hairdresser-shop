import {
  ADD_PAYMENT_WEBSITE,
  CLEAR_PAYMENT_WEBSITE,
  REMOVE_PAYMENT_WEBSITE,
} from "../actions/actionPaymentsMonthWebsite";

export const paymentsWebsiteReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_PAYMENT_WEBSITE:
      return [...state, action.payload];
    case REMOVE_PAYMENT_WEBSITE:
      return state.filter((item, index) => {
        if (index === action.payload.index) {
        }
      });
    case CLEAR_PAYMENT_WEBSITE:
      return [];
    default:
      return state;
  }
};
