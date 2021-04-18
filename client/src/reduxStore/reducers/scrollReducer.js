import { ADD_SECTION, CLEAR_SECTIONS } from "../actions/actionScroll";

export const scrollReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_SECTION:
      if (state.length <= 5) {
        return [...state, action.payload];
      }
    case CLEAR_SECTIONS:
      return [];
    default:
      return state;
  }
};
