import { getExcludedDates } from "../../utils/sessions";

export const FETCH_ALL_EXCLUDED_TIMES_REQUEST =
  "FETCH_ALL_EXCLUDED_TIMES_REQUEST";
export const FETCH_ALL_EXCLUDED_TIMES_SUCCESS =
  " FETCH_ALL_EXCLUDED_TIMES_SUCCESS";
export const FETCH_ALL_EXCLUDED_TIMES_FAILURE =
  "FETCH_ALL_EXCLUDED_TIMES_FAILURE";

export const fetchAllExTimesRequest = () => ({
  type: FETCH_ALL_EXCLUDED_TIMES_REQUEST,
});

const fetchAllExTimesSuccess = (time) => ({
  type: FETCH_ALL_EXCLUDED_TIMES_SUCCESS,
  payload: time,
});

const fetchAllExTimesFailure = (error) => ({
  type: FETCH_ALL_EXCLUDED_TIMES_FAILURE,
  payload: error,
});

export const fetchAllTimesExcluded = () => {
  return async (dispatch) => {
    await dispatch(fetchAllExTimesRequest());
    const { data, status } = await getExcludedDates();

    if (status === 200) {
      await dispatch(fetchAllExTimesSuccess(data));
    } else {
      const errorMessage = "Failed to fetch data";
      await dispatch(fetchAllExTimesFailure(errorMessage));
    }
  };
};
