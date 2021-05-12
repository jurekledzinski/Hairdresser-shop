export const ADD_BOOKED_ORDER = "ADD_BOOKED_ORDER";
export const REMOVE_BOOKED_ORDER = "REMOVE_BOOKED_ORDER";

export const addBookedOrder = (order) => ({
  type: ADD_BOOKED_ORDER,
  payload: order,
});

export const removeBookedOrder = (id) => ({
  type: REMOVE_BOOKED_ORDER,
  payload: {
    id: id,
  },
});
