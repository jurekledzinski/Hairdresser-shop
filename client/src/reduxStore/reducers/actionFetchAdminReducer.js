import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  CLEAR_ADMIN_LOG_OUT,
} from "../actions/actionFetchAdmin";

const initialState = {
  loading: true,
  users: [],
  error: "",
};

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USERS_SUCCESS:
      return {
        loading: false,
        users: action.payload,
        error: "",
      };
    case FETCH_USERS_FAILURE:
      return {
        loading: false,
        users: [],
        error: action.payload,
      };
    case CLEAR_ADMIN_LOG_OUT:
      return {
        loading: false,
        users: [],
        error: "",
      };
    default:
      return state;
  }
};
