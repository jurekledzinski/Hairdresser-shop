import {
  FETCH_OPINIONS_REQUEST,
  FETCH_OPINIONS_SUCCESS,
  FETCH_OPINIONS_FAILURE,
  CLEAR_FETCH_OPINIONS,
} from "../actions/actionFetchOpinions";

const initialState = {
  loading: false,
  opinions: [],
  error: "",
};

export const fetchOpinionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_OPINIONS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_OPINIONS_SUCCESS:
      return {
        loading: false,
        opinions: action.payload,
        error: "",
      };
    case FETCH_OPINIONS_FAILURE:
      return {
        loading: false,
        opinions: [],
        error: action.payload,
      };
    case CLEAR_FETCH_OPINIONS:
      return initialState;
    default:
      return state;
  }
};
