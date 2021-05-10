import {
  FETCH_ALL_EXCLUDED_TIMES_REQUEST,
  FETCH_ALL_EXCLUDED_TIMES_SUCCESS,
  FETCH_ALL_EXCLUDED_TIMES_FAILURE,
} from "../actions/actionFetchExcludedTimes";

const initialState = {
  loading: false,
  allExTimes: [],
  error: "",
};

export const fetchAllExcludedTimesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_EXCLUDED_TIMES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_ALL_EXCLUDED_TIMES_SUCCESS:
      return {
        loading: false,
        allExTimes: action.payload,
        error: "",
      };
    case FETCH_ALL_EXCLUDED_TIMES_FAILURE:
      return {
        loading: false,
        allExTimes: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
