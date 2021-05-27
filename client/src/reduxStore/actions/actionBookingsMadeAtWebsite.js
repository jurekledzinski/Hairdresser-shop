export const ADD_BOOKING_WEBSITE = "ADD_BOOKING_WEBSITE";
export const CLEAR_BOOKING_WEBSITE = "CLEAR_BOOKING_WEBSITE";
export const DECREASE_BOOKING_WEBSITE_CHART = "DECREASE_BOOKING_WEBSITE_CHART";
export const INCREASE_BOOKING_WEBSITE_CHART = "INCREASE_BOOKING_WEBSITE_CHART";

export const addBookingMonthWebsite = (booking) => ({
  type: ADD_BOOKING_WEBSITE,
  payload: {
    months: booking.months,
    amount: booking.amount,
  },
});

export const removeBookingMonthWebsite = (index) => ({
  type: DECREASE_BOOKING_WEBSITE_CHART,
  payload: {
    index: index,
  },
});

export const increaseBookingMonthWebsite = (index) => ({
  type: INCREASE_BOOKING_WEBSITE_CHART,
  payload: {
    index: index,
  },
});

export const clearBookingMonthWebsite = () => ({
  type: CLEAR_BOOKING_WEBSITE,
});
