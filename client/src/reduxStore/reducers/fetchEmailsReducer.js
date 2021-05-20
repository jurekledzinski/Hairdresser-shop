import {
  FETCH_EMAILS_REQUEST,
  FETCH_EMAILS_SUCCESS,
  FETCH_EMAILS_FAILURE,
  CLEAR_FETCH_EMAILS,
} from "../actions/actionFetchEmails";

const initialState = {
  loading: false,
  emails: [],
  error: "",
};

export const fetchEmailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EMAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_EMAILS_SUCCESS:
      return {
        loading: false,
        emails: action.payload,
        error: "",
      };
    case FETCH_EMAILS_FAILURE:
      return {
        loading: false,
        emails: [],
        error: action.payload,
      };
    case CLEAR_FETCH_EMAILS:
      return initialState;
    default:
      return state;
  }
};
