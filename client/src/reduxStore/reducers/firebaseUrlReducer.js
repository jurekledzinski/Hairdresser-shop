import {
  ADD_URL_FIREBASE,
  REMOVE_URL_FIREBASE,
} from "../actions/actionUrlFirebase";

export const firebaseUrlReducer = (state = { url: null }, action) => {
  console.log(action, " firebase reducer");
  switch (action.type) {
    case ADD_URL_FIREBASE:
      return action.payload;
    case REMOVE_URL_FIREBASE:
      return action.payload;
    default:
      return state;
  }
};
