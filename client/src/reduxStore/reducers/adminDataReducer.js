import {
  ADD_ADMIN_DATA,
  CLEAR_ADMIN_DATA,
  UPDATE_ADMIN_DATA,
} from "../actions/actionAdminData";

export const adminDataReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_ADMIN_DATA:
      return action.payload;
    case UPDATE_ADMIN_DATA:
      return {
        ...state,
        enableBook: action.payload.enableBook,
        enableCancel: action.payload.enableCancel,
        enableEmails: action.payload.enableEmails,
        enableGallery: action.payload.enableGallery,
        enableOpinions: action.payload.enableOpinions,
        enableOpenShop: action.payload.enableOpenShop,
        enableServices: action.payload.enableServices,
        enablePermission: action.payload.enablePermission,
      };
    case CLEAR_ADMIN_DATA:
      return {};
    default:
      return state;
  }
};
