import {
  FETCH_BOOKINGS_MONTH_SHOP_REQUEST,
  FETCH_BOOKINGS_MONTH_SHOP_SUCCESS,
  FETCH_BOOKINGS_MONTH_SHOP_FAILURE,
  CLEAR_FETCH_BOOKINGS_AMOUNT_MONTH_SHOP,
} from "../actions/actionFetchAmountBookingsPerMonthInShop";

const initialState = {
  loading: false,
  bookingsShop: [],
  error: "",
};

export const fetchAmountBookingsPerMonthInShopReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case FETCH_BOOKINGS_MONTH_SHOP_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_BOOKINGS_MONTH_SHOP_SUCCESS:
      return {
        loading: false,
        bookingsShop: action.payload,
        error: "",
      };
    case FETCH_BOOKINGS_MONTH_SHOP_FAILURE:
      return {
        loading: false,
        bookingsShop: [],
        error: action.payload,
      };
    case CLEAR_FETCH_BOOKINGS_AMOUNT_MONTH_SHOP:
      return initialState;
    default:
      return state;
  }
};
