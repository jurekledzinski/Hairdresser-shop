import {
  ADD_CANCELED_ORDER,
  REMOVE_CANCELED_ORDER,
} from "../actions/actionCanceledOrders";

export const canceledOrdersReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_CANCELED_ORDER:
      return [...state, action.payload];
    case REMOVE_CANCELED_ORDER:
      return state.filter((item) => item._id !== action.payload.id);
    default:
      return state;
  }
};
