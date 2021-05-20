import { fetchRegisterAdmin } from "../../utils/sessions";

export const FETCH_ADMINS_REQUEST = "FETCH_ADMINS_REQUEST";
export const FETCH_ADMINS_SUCCESS = "FETCH_ADMINS_SUCCESS";
export const FETCH_ADMINS_FAILURE = "FETCH_ADMINS_FAILURE";
export const CLEAR_FETCH_ADMINS = "CLEAR_FETCH_ADMINS";

export const fetchAdminsRequest = () => ({
  type: FETCH_ADMINS_REQUEST,
});

const fetchAdminsSuccess = (admins) => ({
  type: FETCH_ADMINS_SUCCESS,
  payload: admins,
});

const fetchAdminsFailure = (error) => ({
  type: FETCH_ADMINS_FAILURE,
  payload: error,
});

export const clearFetchRegisterAdmins = () => ({
  type: CLEAR_FETCH_ADMINS,
});

export const fetchAllAdmins = () => {
  return async (dispatch) => {
    await dispatch(fetchAdminsRequest());
    const { data, status } = await fetchRegisterAdmin();

    if (status === 200) {
      await dispatch(fetchAdminsSuccess(data));
    } else {
      const errorMessage = "Failed to fetch data";
      await dispatch(fetchAdminsFailure(errorMessage));
    }
  };
};
