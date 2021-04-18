import { ADD_SERVER_ERROR_FETCH } from "../actions/actionServerError";

const initialValues = {
  alert: null,
  where: null,
  statusCode: null,
};

export const serverErrorReducer = (state = initialValues, action) => {
  console.log(action);
  switch (action.type) {
    case ADD_SERVER_ERROR_FETCH:
      return action.payload;
    default:
      return state;
  }
};
