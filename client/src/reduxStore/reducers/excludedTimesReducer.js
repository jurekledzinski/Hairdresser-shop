import {
  ADD_EXCLUDED_TIMES,
  REMOVE_EXCLUDED_TIMES,
} from "../actions/actionExcludedTimes";

export const excludedTimesReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_EXCLUDED_TIMES:
      return [...state, action.payload];
    case REMOVE_EXCLUDED_TIMES:
      return state.filter((item) => item?.bookingId !== action.payload?.id);
    default:
      return state;
  }
};
