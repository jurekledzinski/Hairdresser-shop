import { ADD__TESTIMONIAL } from "../actions/actionOpinions";

export const opinionsReducer = (state = null, action) => {
  switch (action.type) {
    case ADD__TESTIMONIAL:
      return action.payload;
    default:
      return state;
  }
};
