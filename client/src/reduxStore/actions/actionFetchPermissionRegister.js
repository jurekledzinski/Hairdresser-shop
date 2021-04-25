import { fetchEnableRegisterPermission } from "../../utils/sessions";

export const FETCH_PERMISSION_REGISTER_REQUEST =
  "FETCH_PERMISSION_REGISTER_REQUEST";
export const FETCH_PERMISSION_REGISTER_SUCCESS =
  "FETCH_PERMISSION_REGISTER_SUCCESS";
export const FETCH_PERMISSION_REGISTER_FAILURE =
  "FETCH_PERMISSION_REGISTER_FAILURE";

export const fetchPermissionRequest = () => ({
  type: FETCH_PERMISSION_REGISTER_REQUEST,
});

const fetchPermissionSuccess = (permission) => ({
  type: FETCH_PERMISSION_REGISTER_SUCCESS,
  payload: permission,
});

const fetchPermissionFailure = (error) => ({
  type: FETCH_PERMISSION_REGISTER_FAILURE,
  payload: error,
});

export const fetchPermissionToRegister = () => {
  return async (dispatch) => {
    await dispatch(fetchPermissionRequest());
    const { data, status } = await fetchEnableRegisterPermission();

    if (status === 200) {
      await dispatch(fetchPermissionSuccess(data));
    } else {
      const errorMessage = "Failed to fetch data";
      await dispatch(fetchPermissionFailure(errorMessage));
    }
  };
};
