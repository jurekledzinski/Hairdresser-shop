import { ADD_MENU_LINKS } from "../actions/actionsHeader";

export const headerReducer = (state = [], action) => {
  console.log(action.type);
  switch (action.type) {
    case ADD_MENU_LINKS:
      if (state.length <= 5) {
        return [...state, action.payload];
      }
    default:
      return state;
  }
};
