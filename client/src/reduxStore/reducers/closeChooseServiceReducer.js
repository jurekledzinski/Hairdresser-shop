import { CLOSE_DIV_CHOOSE_SERVICE } from "../actions/actionCloseChooseService";

const initialState = {
  isOpen: false,
};

export const closeChooseServiceReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLOSE_DIV_CHOOSE_SERVICE:
      return {
        isOpen: action.payload.isOpen,
      };
    default:
      return state;
  }
};
