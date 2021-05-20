export const ADD_FIREBASE_URL = "ADD_FIREBASE_URL";
export const REMOVE_FIREBASE_URL = "REMOVE_FIREBASE_URL";

export const addFirebaseUrl = (url) => ({
  type: ADD_FIREBASE_URL,
  payload: {
    link: url,
  },
});

export const removeFireBaseUrl = () => ({
  type: REMOVE_FIREBASE_URL,
  payload: {
    link: "",
  },
});
