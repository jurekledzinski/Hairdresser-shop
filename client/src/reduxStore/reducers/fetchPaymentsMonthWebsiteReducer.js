import {
  FETCH_PAYMENTS_MONTH_WEBSITE_REQUEST,
  FETCH_PAYMENT_MONTH_WEBSITE_SUCCESS,
  FETCH_PAYMENT_MONTH_WEBSITE_FAILURE,
  CLEAR_FETCH_PAYMENT_MONTH_WEBSITE,
} from "../actions/actionFetchPaymentsMonthWebsite";

const initialState = {
  loading: false,
  paymentsWebsite: [],
  error: "",
};

export const fetchPaymentsWebsiteReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PAYMENTS_MONTH_WEBSITE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_PAYMENT_MONTH_WEBSITE_SUCCESS:
      return {
        loading: false,
        paymentsWebsite: action.payload,
        error: "",
      };
    case FETCH_PAYMENT_MONTH_WEBSITE_FAILURE:
      return {
        loading: false,
        paymentsWebsite: [],
        error: action.payload,
      };
    case CLEAR_FETCH_PAYMENT_MONTH_WEBSITE:
      return initialState;
    default:
      return state;
  }
};
