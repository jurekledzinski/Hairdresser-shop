import {
  ADD_ORDER_DETAILS,
  CLEAR_ORDER_DETAILS,
} from "../actions/actionOrderDetails";

export const orderDetailsReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_ORDER_DETAILS:
      return action.payload;
    case CLEAR_ORDER_DETAILS:
      return action.payload;
    default:
      return state;
  }
};
