export const ADD_URL_FIREBASE = "ADD_URL_FIREBASE";
export const REMOVE_URL_FIREBASE = "REMOVE_URL_FIREBASE";

export const addFirebaseUrl = (url) => ({
  type: ADD_URL_FIREBASE,
  payload: {
    firebaseUrl: url,
  },
});

export const removeFirebaseUrl = () => ({
  type: REMOVE_URL_FIREBASE,
  payload: {
    firebaseUrl: null,
  },
});
