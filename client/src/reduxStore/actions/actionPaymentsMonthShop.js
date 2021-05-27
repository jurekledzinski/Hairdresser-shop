export const ADD_PAYMENT_SHOP = "ADD_PAYMENT_SHOP";
export const CLEAR_PAYMENT_SHOP = "CLEAR_PAYMENT_SHOP";
export const DECREASE_PAYMENT_SHOP_CHART = "DECREASE_PAYMENT_SHOP_CHART";
export const INCREASE_PAYMENT_SHOP_CHART = "INCREASE_PAYMENT_SHOP_CHART";

export const addPaymentsMonthShop = (payment) => ({
  type: ADD_PAYMENT_SHOP,
  payload: {
    months: payment.months,
    total: payment.total,
  },
});

export const removePaymentsMonthShop = (index, money) => ({
  type: DECREASE_PAYMENT_SHOP_CHART,
  payload: {
    index: index,
    money: money,
  },
});

export const increasePaymentsMonthShop = (index, money) => ({
  type: INCREASE_PAYMENT_SHOP_CHART,
  payload: {
    index: index,
    money: money,
  },
});

export const clearPaymentsMonthShop = () => ({
  type: CLEAR_PAYMENT_SHOP,
});
