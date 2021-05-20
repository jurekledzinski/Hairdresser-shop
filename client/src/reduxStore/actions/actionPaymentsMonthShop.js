export const ADD_PAYMENT_SHOP = "ADD_PAYMENT_SHOP";
export const CLEAR_PAYMENT_SHOP = "CLEAR_PAYMENT_SHOP";
export const REMOVE_PAYMENT_SHOP = "REMOVE_PAYMENT_SHOP";

export const addPaymentsMonthShop = (payment) => ({
  type: ADD_PAYMENT_SHOP,
  payload: {
    months: payment.months,
    total: payment.total,
  },
});

export const removePaymentsMonthShop = (index) => ({
  type: REMOVE_PAYMENT_SHOP,
  payload: {
    index: index,
  },
});

export const clearPaymentsMonthShop = () => ({
  type: CLEAR_PAYMENT_SHOP,
});
