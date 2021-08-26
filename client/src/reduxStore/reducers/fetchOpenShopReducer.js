import {
  FETCH_OPEN_SHOP_REQUEST,
  FETCH_OPEN_SHOP_SUCCESS,
  FETCH_OPEN_SHOP_FAILURE,
  CLEAR_FETCH_OPEN_SHOP,
} from "../actions/actionFetchOpenShop";

const initialState = {
  loading: false,
  shop: [],
  error: "",
};

export const fetchOpenShopReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_OPEN_SHOP_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_OPEN_SHOP_SUCCESS:
      return {
        loading: false,
        shop: action.payload,
        error: "",
      };
    case FETCH_OPEN_SHOP_FAILURE:
      return {
        loading: false,
        shop: [],
        error: action.payload,
      };
    case CLEAR_FETCH_OPEN_SHOP:
      return initialState;
    default:
      return state;
  }
};
