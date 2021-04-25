import { fetchAllEmails } from "../../utils/sessions";

export const FETCH_EMAILS_REQUEST = "FETCH_EMAILS_REQUEST";
export const FETCH_EMAILS_SUCCESS = "FETCH_EMAILS_SUCCESS";
export const FETCH_EMAILS_FAILURE = "FETCH_EMAILS_FAILURE";

export const fetchEmailsRequest = () => ({
  type: FETCH_EMAILS_REQUEST,
});

const fetchEmailsSuccess = (emails) => ({
  type: FETCH_EMAILS_SUCCESS,
  payload: emails,
});

const fetchEmailsFailure = (error) => ({
  type: FETCH_EMAILS_FAILURE,
  payload: error,
});

export const fetchEmails = () => {
  return async (dispatch) => {
    await dispatch(fetchEmailsRequest());
    const { data, status } = await fetchAllEmails();

    if (status === 200) {
      await dispatch(fetchEmailsSuccess(data));
    } else {
      const errorMessage = "Failed to fetch data";
      await dispatch(fetchEmailsFailure(errorMessage));
    }
  };
};
