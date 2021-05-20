import { fetchAdminData } from "../../utils/sessions";

export const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
export const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";
export const CLEAR_ADMIN_LOG_OUT = "CLEAR_ADMIN_LOG_OUT";

export const fetchUsersRequest = () => ({
  type: FETCH_USERS_REQUEST,
});

const fetchUsersSuccess = (users) => ({
  type: FETCH_USERS_SUCCESS,
  payload: users,
});

const fetchUsersFailure = (error) => ({
  type: FETCH_USERS_FAILURE,
  payload: error,
});

export const clearAdminLogOut = () => ({
  type: CLEAR_ADMIN_LOG_OUT,
  payload: [],
});

export const fetchUsers = () => {
  return async (dispatch) => {
    await dispatch(fetchUsersRequest());
    const { data, status } = await fetchAdminData();

    if (status === 200) {
      console.log(data, " to jest fetch admin");
      await dispatch(fetchUsersSuccess(data));
    } else {
      const errorMessage = "Failed to fetch data";
      await dispatch(fetchUsersFailure(errorMessage));
    }
  };
};
