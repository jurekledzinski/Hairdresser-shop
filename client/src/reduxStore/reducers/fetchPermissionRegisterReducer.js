import {
  FETCH_PERMISSION_REGISTER_REQUEST,
  FETCH_PERMISSION_REGISTER_SUCCESS,
  FETCH_PERMISSION_REGISTER_FAILURE,
  CLEAR_FETCH_PERMISSION_REGISTER,
} from "../actions/actionFetchPermissionRegister";

const initialState = {
  loading: false,
  permission: [],
  error: "",
};

export const fetchPermissionToRegisterReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case FETCH_PERMISSION_REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_PERMISSION_REGISTER_SUCCESS:
      return {
        loading: false,
        permission: action.payload,
        error: "",
      };
    case FETCH_PERMISSION_REGISTER_FAILURE:
      return {
        loading: false,
        permission: [],
        error: action.payload,
      };
    case CLEAR_FETCH_PERMISSION_REGISTER:
      return initialState;
    default:
      return state;
  }
};
