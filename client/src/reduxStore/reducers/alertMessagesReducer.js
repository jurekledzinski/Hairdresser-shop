import {
  ADD_ERROR_SERVER_MSG,
  ADD_SUCCESS_SERVER_MSG,
  REMOVE_ERROR_SERVER_MSG,
  REMOVE_SUCCESS_SERVER_MSG,
} from "../actions/actionAlertsMessages";

export const alertMessagesReducer = (
  state = {
    errorServerMsg: null,
    successServerMsg: null,
    where: null,
  },
  action
) => {
  switch (action.type) {
    case ADD_ERROR_SERVER_MSG:
      return action.payload;
    case ADD_SUCCESS_SERVER_MSG:
      return action.payload;
    case REMOVE_ERROR_SERVER_MSG:
      return action.payload;
    case REMOVE_SUCCESS_SERVER_MSG:
      return action.payload;
    default:
      return state;
  }
};
