import { GET_SIZE_WINDOW } from "../actions/actionResizeWindow";

export const resizeWindowReducer = (
  state = { size: window.innerWidth },
  action
) => {
  switch (action.type) {
    case GET_SIZE_WINDOW:
      return action.payload;
    default:
      return state;
  }
};
