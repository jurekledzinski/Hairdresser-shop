export const ADD_BOOKING_SHOP = "ADD_BOOKING_SHOP";
export const CLEAR_BOOKING_SHOP = "CLEAR_BOOKING_SHOP";
export const DECREASE_BOOKING_SHOP_CHART = "DECREASE_BOOKING_SHOP_CHART";
export const INCREASE_BOOKING_SHOP_CHART = "INCREASE_BOOKING_SHOP_CHART";

export const addBookingMonthShop = (booking) => ({
  type: ADD_BOOKING_SHOP,
  payload: {
    months: booking.months,
    amount: booking.amount,
  },
});

export const removeBookingMonthShop = (index) => ({
  type: DECREASE_BOOKING_SHOP_CHART,
  payload: {
    index: index,
  },
});

export const increaseBookingMonthShop = (index) => ({
  type: INCREASE_BOOKING_SHOP_CHART,
  payload: {
    index: index,
  },
});

export const clearBookingMonthShop = () => ({
  type: CLEAR_BOOKING_SHOP,
});
