import { ADD_SECTION } from "../actions/actionScroll";

export const scrollReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_SECTION:
      return [...state, action.payload];
    default:
      console.log(`Nie mamy akcji typu ${action.type}`);
      return state;
  }
};
