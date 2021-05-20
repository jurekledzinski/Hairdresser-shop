import { fetchOpinionsAll } from "../../utils/sessions";

export const FETCH_OPINIONS_REQUEST = "FETCH_OPINIONS_REQUEST";
export const FETCH_OPINIONS_SUCCESS = "FETCH_OPINIONS_SUCCESS";
export const FETCH_OPINIONS_FAILURE = "FETCH_OPINIONS_FAILURE";
export const CLEAR_FETCH_OPINIONS = "CLEAR_FETCH_OPINIONS";

export const fetchOpinionsRequest = () => ({
  type: FETCH_OPINIONS_REQUEST,
});

const fetchOpinionsSuccess = (opinions) => ({
  type: FETCH_OPINIONS_SUCCESS,
  payload: opinions,
});

const fetchOpinionsFailure = (error) => ({
  type: FETCH_OPINIONS_FAILURE,
  payload: error,
});

export const clearFetchOpinions = () => ({
  type: CLEAR_FETCH_OPINIONS,
});

export const fetchOpinions = () => {
  return async (dispatch) => {
    await dispatch(fetchOpinionsRequest());
    const { data, status } = await fetchOpinionsAll();

    if (status === 200) {
      await dispatch(fetchOpinionsSuccess(data));
    } else {
      const errorMessage = "Failed to fetch data";
      await dispatch(fetchOpinionsFailure(errorMessage));
    }
  };
};
