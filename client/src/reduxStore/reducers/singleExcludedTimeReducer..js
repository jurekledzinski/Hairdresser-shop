import {
  ADD_SINGLE_EXCLUDED_TIME,
  REMOVE_SINGLE_EXCLUDED_TIME,
} from "../actions/actionSingleExcludedTime";

export const singleExcludedTimeReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_SINGLE_EXCLUDED_TIME:
      return [action.payload];
    case REMOVE_SINGLE_EXCLUDED_TIME:
      return [];
    default:
      return state;
  }
};
