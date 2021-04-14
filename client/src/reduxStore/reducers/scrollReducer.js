import { ADD_SECTION } from "../actions/actionScroll";

export const scrollReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_SECTION:
      if (state.length <= 5) {
        return [...state, action.payload];
      }
    default:
      return state;
  }
};
