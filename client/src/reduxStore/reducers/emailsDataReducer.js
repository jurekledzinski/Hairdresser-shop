import {
  ADD_EMAIL,
  CLEAR_EMAIL,
  REMOVE_EMAIL,
} from "../actions/actionEmailsData";

export const emailDataReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_EMAIL:
      return [...state, action.payload];
    case REMOVE_EMAIL:
      return state.filter((item) => item._id !== action.payload.id);
    case CLEAR_EMAIL:
      return [];
    default:
      return state;
  }
};
