export const ADD_CANCELED_ORDER = "ADD_CANCELED_ORDER";
export const REMOVE_CANCELED_ORDER = "REMOVE_CANCELED_ORDER";

export const addCanceledOrder = (order) => ({
  type: ADD_CANCELED_ORDER,
  payload: order,
});

export const removeCanceledOrder = (id) => ({
  type: REMOVE_CANCELED_ORDER,
  payload: {
    id: id,
  },
});
