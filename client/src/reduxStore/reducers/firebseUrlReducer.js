import {
  ADD_FIREBASE_URL,
  REMOVE_FIREBASE_URL,
} from "../actions/actionFirebseUrl";

export const firebaseUrlReducer = (state = { link: "" }, action) => {
  switch (action.type) {
    case ADD_FIREBASE_URL:
      return {
        link: action.payload.link,
      };
    case REMOVE_FIREBASE_URL:
      return {
        link: "",
      };
    default:
      return state;
  }
};
