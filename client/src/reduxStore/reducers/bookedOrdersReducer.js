import {
  ADD_BOOKED_ORDER,
  REMOVE_BOOKED_ORDER,
} from "../actions/actionBookedOrders";

export const bookedOrdersReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_BOOKED_ORDER:
      return [...state, action.payload];
    case REMOVE_BOOKED_ORDER:
      return state.filter((item) => item._id !== action.payload.id);
    default:
      return state;
  }
};
