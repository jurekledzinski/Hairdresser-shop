import { ADD_FILE, REMOVE_FILE } from "../actions/actionFile";

export const fileReducer = (
  state = { fileImageTestimonial: null, fileImageRegister: null },
  action
) => {
  switch (action.type) {
    case ADD_FILE:
      return action.payload;
    case REMOVE_FILE:
      return action.payload;
    default:
      return state;
  }
};
