import {
  ADD_MAIN_PAGE_OPINIONS,
  ADD_SINGLE_MAIN_PAGE_OPINION,
} from "../actions/actionMainPageOpinions";

const initialState = [];

export const mainPageOpinionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MAIN_PAGE_OPINIONS:
      return action.payload.opinions;
    case ADD_SINGLE_MAIN_PAGE_OPINION:
      return [...state, action.payload.opinions];
    default:
      return state;
  }
};
