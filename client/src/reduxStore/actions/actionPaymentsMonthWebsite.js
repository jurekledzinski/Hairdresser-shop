export const ADD_PAYMENT_WEBSITE = "ADD_PAYMENT_WEBSITE";
export const CLEAR_PAYMENT_WEBSITE = "CLEAR_PAYMENT_WEBSITE";
export const REMOVE_PAYMENT_WEBSITE = "REMOVE_PAYMENT_WEBSITE";

export const addPaymentsMonthWebsite = (payment) => ({
  type: ADD_PAYMENT_WEBSITE,
  payload: {
    total: payment.total,
    months: payment.months,
  },
});

export const removePaymentsMonthWebsite = (index) => ({
  type: REMOVE_PAYMENT_WEBSITE,
  payload: {
    index: index,
  },
});

export const clearPaymentsMonthWebsite = () => ({
  type: CLEAR_PAYMENT_WEBSITE,
});
