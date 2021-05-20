export const ADD_BOOKING_SHOP = "ADD_BOOKING_SHOP";
export const CLEAR_BOOKING_SHOP = "CLEAR_BOOKING_SHOP";
export const REMOVE_BOOKING_SHOP = "REMOVE_BOOKING_SHOP";

export const addBookingMonthShop = (booking) => ({
  type: ADD_BOOKING_SHOP,
  payload: {
    months: booking.months,
    amount: booking.amount,
  },
});

export const removeBookingMonthShop = (index) => ({
  type: REMOVE_BOOKING_SHOP,
  payload: {
    index: index,
  },
});

export const clearBookingMonthShop = () => ({
  type: CLEAR_BOOKING_SHOP,
});
