import { ADD_MENU_LINKS, REMOVE_MENU_LINKS } from "../actions/actionsHeader";

export const headerReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_MENU_LINKS:
      if (state.length <= 5) {
        return [...state, action.payload];
      }
    case REMOVE_MENU_LINKS:
      return [];
    default:
      return state;
  }
};
