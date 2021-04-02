import { GET_SIZE_WINDOW } from "../actions/actionResizeWindow";

export const resizeWindowReducer = (
  state = { size: window.innerWidth },
  action
) => {
  console.log(action);
  switch (action.type) {
    case GET_SIZE_WINDOW:
      return action.payload;
    default:
      console.log(`Nie mamy akcji typu ${action.type}`);
      return state;
  }
};
