import {
  FETCH_PAYMENTS_MONTH_SHOP_REQUEST,
  FETCH_PAYMENTS_MONTH_SHOP_SUCCESS,
  FETCH_PAYMENTS_MONTH_SHOP_FAILURE,
  CLEAR_FETCH_PAYMENTS_MONTH_SHOP,
} from "../actions/actionFetchPaymentsMonthShop";

const initialState = {
  loading: false,
  paymentsShop: [],
  error: "",
};

export const fetchPaymentsShopReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PAYMENTS_MONTH_SHOP_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_PAYMENTS_MONTH_SHOP_SUCCESS:
      return {
        loading: false,
        paymentsShop: action.payload,
        error: "",
      };
    case FETCH_PAYMENTS_MONTH_SHOP_FAILURE:
      return {
        loading: false,
        paymentsShop: [],
        error: action.payload,
      };
    case CLEAR_FETCH_PAYMENTS_MONTH_SHOP:
      return initialState;
    default:
      return state;
  }
};
