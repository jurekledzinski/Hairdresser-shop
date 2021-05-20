import {
  ADD_OPINION,
  CLEAR_OPINION,
  REMOVE_OPINION,
} from "../actions/actionOpinionsData";

export const opinionsDataReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_OPINION:
      return [...state, action.payload];
    case REMOVE_OPINION:
      return state.filter((item) => item._id !== action.payload.id);
    case CLEAR_OPINION:
      return [];
    default:
      return state;
  }
};
