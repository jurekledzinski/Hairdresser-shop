import {
  FETCH_ALL_SERVICES_REQUEST,
  FETCH_ALL_SERVICES_SUCCESS,
  FETCH_ALL_SERVICES_FAILURE,
} from "../actions/actionFetchAllServices";

const initialState = {
  loading: false,
  allServices: [],
  error: "",
};

export const fetchAllServicesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_SERVICES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_ALL_SERVICES_SUCCESS:
      return {
        loading: false,
        allServices: action.payload,
        error: "",
      };
    case FETCH_ALL_SERVICES_FAILURE:
      return {
        loading: false,
        allServices: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
