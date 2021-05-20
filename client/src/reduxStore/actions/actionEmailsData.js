export const ADD_EMAIL = "ADD_EMAIL";
export const CLEAR_EMAIL = "CLEAR_EMAIL";
export const REMOVE_EMAIL = "REMOVE_EMAIL";

export const addEmail = (email) => ({
  type: ADD_EMAIL,
  payload: email,
});

export const removeEmail = (id) => ({
  type: REMOVE_EMAIL,
  payload: {
    id: id,
  },
});

export const clearEmailData = () => ({
  type: CLEAR_EMAIL,
});
