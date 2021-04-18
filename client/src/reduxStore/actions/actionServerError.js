export const ADD_SERVER_ERROR_FETCH = "ADD_SERVER_ERROR_FETCH";

export const addErrorServerWhenFetchData = (alert, where, statusCode) => ({
  type: ADD_SERVER_ERROR_FETCH,
  payload: {
    alert,
    where,
    statusCode,
  },
});
