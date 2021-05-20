import { getAmountBookingsEachMonthWebsite } from "../../utils/sessions";

export const FETCH_BOOKINGS_MONTH_WEBSITE_REQUEST =
  "FETCH_BOOKINGS_MONTH_WEBSITE_REQUEST";
export const FETCH_BOOKINGS_MONTH_WEBSITE_SUCCESS =
  "FETCH_BOOKINGS_MONTH_WEBSITE_SUCCESS";
export const FETCH_BOOKINGS_MONTH_WEBSITE_FAILURE =
  "FETCH_BOOKINGS_MONTH_WEBSITE_FAILURE";
export const CLEAR_BOOKINGS_MONTH_WEBSITE = "CLEAR_BOOKINGS_MONTH_WEBSITE";

export const fetchBookingsMonthWebsiteRequest = () => ({
  type: FETCH_BOOKINGS_MONTH_WEBSITE_REQUEST,
});

const fetchBookingsMonthWebsiteSuccess = (booking) => ({
  type: FETCH_BOOKINGS_MONTH_WEBSITE_SUCCESS,
  payload: booking,
});

const fetchBookingsMonthWebsiteFailure = (error) => ({
  type: FETCH_BOOKINGS_MONTH_WEBSITE_FAILURE,
  payload: error,
});

export const clearFetchBookingsMonthWebsite = () => ({
  type: CLEAR_BOOKINGS_MONTH_WEBSITE,
});

export const fetchBookingsMadeAtWebsite = () => {
  return async (dispatch) => {
    await dispatch(fetchBookingsMonthWebsiteRequest());
    const { data, status } = await getAmountBookingsEachMonthWebsite();

    if (status === 200) {
      await dispatch(fetchBookingsMonthWebsiteSuccess(data));
    } else {
      const errorMessage = "Failed to fetch data";
      await dispatch(fetchBookingsMonthWebsiteFailure(errorMessage));
    }
  };
};
