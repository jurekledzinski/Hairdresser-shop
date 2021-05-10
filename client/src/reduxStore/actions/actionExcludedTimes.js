export const ADD_EXCLUDED_TIMES = "ADD_EXCLUDED_TIMES";
export const REMOVE_EXCLUDED_TIMES = "REMOVE_EXCLUDED_TIMES";

export const addExcludTimes = (time) => ({
  type: ADD_EXCLUDED_TIMES,
  payload: time,
});

export const removeExcludTimes = (id) => ({
  type: REMOVE_EXCLUDED_TIMES,
  payload: {
    id: id,
  },
});
