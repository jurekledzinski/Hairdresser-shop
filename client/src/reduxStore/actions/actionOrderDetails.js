export const ADD_ORDER_DETAILS = "ADD_ORDER_DETAILS";
export const CLEAR_ORDER_DETAILS = "CLEAR_ORDER_DETAILS";

export const addOrderDetails = (service) => ({
  type: ADD_ORDER_DETAILS,
  payload: service,
});

export const clearOrderDetails = (service) => ({
  type: CLEAR_ORDER_DETAILS,
  payload: service,
});
