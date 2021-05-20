export const ADD_BOOKING_WEBSITE = "ADD_BOOKING_WEBSITE";
export const CLEAR_BOOKING_WEBSITE = "CLEAR_BOOKING_WEBSITE";
export const REMOVE_BOOKING_WEBSITE = "REMOVE_BOOKING_WEBSITE";

export const addBookingMonthWebsite = (booking) => ({
  type: ADD_BOOKING_WEBSITE,
  payload: {
    months: booking.months,
    amount: booking.amount,
  },
});

export const removeBookingMonthWebsite = (index) => ({
  type: REMOVE_BOOKING_WEBSITE,
  payload: {
    index: index,
  },
});

export const clearBookingMonthWebsite = () => ({
  type: CLEAR_BOOKING_WEBSITE,
});
