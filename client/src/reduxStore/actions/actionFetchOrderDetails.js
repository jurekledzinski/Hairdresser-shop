import { getBookingUser } from "../../utils/sessions";

export const FETCH_BOOKING_USER_REQUEST = "FETCH_BOOKING_USER_REQUEST";
export const FETCH_BOOKING_USER_SUCCESS = "FETCH_BOOKING_USER_SUCCESS";
export const FETCH_BOOKING_USER_FAILURE = "FETCH_BOOKING_USER_FAILURE";

export const fetchBookingUserRequest = () => ({
  type: FETCH_BOOKING_USER_REQUEST,
});

const fetchBookingUserSuccess = (bookingUser) => ({
  type: FETCH_BOOKING_USER_SUCCESS,
  payload: bookingUser,
});

const fetchBookingUserFailure = (error) => ({
  type: FETCH_BOOKING_USER_FAILURE,
  payload: error,
});

export const fetchBookingUser = (id) => {
  return async (dispatch) => {
    await dispatch(fetchBookingUserRequest());
    const { data, status } = await getBookingUser(id);

    if (status === 200) {
      await dispatch(fetchBookingUserSuccess(data));
    } else {
      const errorMessage = "Failed to fetch data";
      await dispatch(fetchBookingUserFailure(errorMessage));
    }
  };
};
