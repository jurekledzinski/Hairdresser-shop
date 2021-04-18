export const ADD_ERROR_SERVER_MSG = "ADD_ERROR_SERVER_MSG";
export const ADD_SUCCESS_SERVER_MSG = "ADD_SUCCESS_SERVER_MSG";
export const REMOVE_ERROR_SERVER_MSG = "REMOVE_ERROR_SERVER_MSG";
export const REMOVE_SUCCESS_SERVER_MSG = "REMOVE_SUCCESS_SERVER_MSG";

export const addServerErrorMessage = (message, where) => ({
  type: ADD_ERROR_SERVER_MSG,
  payload: {
    errorServerMsg: message,
    where,
  },
});

export const addServerSuccessMessage = (message, where) => ({
  type: ADD_SUCCESS_SERVER_MSG,
  payload: {
    successServerMsg: message,
    where,
  },
});

export const removeServerErrorMessage = (errorServerMsg, where) => ({
  type: REMOVE_ERROR_SERVER_MSG,
  payload: {
    errorServerMsg,
    where,
  },
});

export const removeServerSuccessMessage = (successServerMsg, where) => ({
  type: REMOVE_SUCCESS_SERVER_MSG,
  payload: {
    successServerMsg,
    where,
  },
});
