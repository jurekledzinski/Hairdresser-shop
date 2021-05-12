import {
  FETCH_CANCELED_ORDERS_REQUEST,
  FETCH_CANCELED_ORDERS_SUCCESS,
  FETCH_CANCELED_ORDERS_FAILURE,
} from "../actions/actionFetchCanceledOrders";

const initialState = {
  loading: false,
  allCanceledOrders: [],
  error: "",
};

export const fetchAllCancledOrdersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CANCELED_ORDERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_CANCELED_ORDERS_SUCCESS:
      return {
        loading: false,
        allCanceledOrders: action.payload,
        error: "",
      };
    case FETCH_CANCELED_ORDERS_FAILURE:
      return {
        loading: false,
        allCanceledOrders: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
