import {
  FETCH_ADMINS_REQUEST,
  FETCH_ADMINS_SUCCESS,
  FETCH_ADMINS_FAILURE,
  CLEAR_FETCH_ADMINS,
} from "../actions/actionFetchRegisteredAdmins";

const initialState = {
  loading: false,
  admins: [],
  error: "",
};

export const fetchAllAdminsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ADMINS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_ADMINS_SUCCESS:
      return {
        loading: false,
        admins: action.payload,
        error: "",
      };
    case FETCH_ADMINS_FAILURE:
      return {
        loading: false,
        admins: [],
        error: action.payload,
      };
    case CLEAR_FETCH_ADMINS:
      return initialState;
    default:
      return state;
  }
};
