export const ADD_SINGLE_EXCLUDED_TIME = "ADD_SINGLE_EXCLUDED_TIME";
export const REMOVE_SINGLE_EXCLUDED_TIME = "REMOVE_SINGLE_EXCLUDED_TIME";

export const addSingleExcludTimes = (time) => ({
  type: ADD_SINGLE_EXCLUDED_TIME,
  payload: time,
});

export const removeSingleExcludTimes = (id) => ({
  type: REMOVE_SINGLE_EXCLUDED_TIME,
  payload: {
    id: id,
  },
});
