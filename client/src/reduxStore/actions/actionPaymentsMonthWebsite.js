export const ADD_PAYMENT_WEBSITE = "ADD_PAYMENT_WEBSITE";
export const CLEAR_PAYMENT_WEBSITE = "CLEAR_PAYMENT_WEBSITE";
export const DECREASE_PAYMENT_WEBSITE_CHART = "DECREASE_PAYMENT_WEBSITE_CHART";
export const INCREASE_PAYMENT_WEBSITE_CHART = "INCREASE_PAYMENT_WEBSITE_CHART";

export const addPaymentsMonthWebsite = (payment) => ({
  type: ADD_PAYMENT_WEBSITE,
  payload: {
    total: payment.total,
    months: payment.months,
  },
});

export const removePaymentsMonthWebsite = (index, money) => ({
  type: DECREASE_PAYMENT_WEBSITE_CHART,
  payload: {
    index: index,
    money: money,
  },
});

export const increasePaymentsMonthWebsite = (index, money) => ({
  type: INCREASE_PAYMENT_WEBSITE_CHART,
  payload: {
    index: index,
    money: money,
  },
});

export const clearPaymentsMonthWebsite = () => ({
  type: CLEAR_PAYMENT_WEBSITE,
});
