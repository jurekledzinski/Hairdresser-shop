import { ADD_FILE, CLEAR_FILE, REMOVE_FILE } from "../actions/actionFile";

export const fileReducer = (
  state = {
    fileImageTestimonial: null,
    fileImageRegister: null,
    fileImageGallery: null,
    fileImageGalleryEdit: null,
    fileImageEditProfile: null,
    fileImageService: null,
    fileEditImageService: null,
  },
  action
) => {
  switch (action.type) {
    case ADD_FILE:
      return action.payload;
    case REMOVE_FILE:
      return action.payload;
    case CLEAR_FILE:
      return {
        fileImageTestimonial: null,
        fileImageRegister: null,
        fileImageGallery: null,
        fileImageGalleryEdit: null,
        fileImageEditProfile: null,
        fileImageService: null,
        fileEditImageService: null,
      };
    default:
      return state;
  }
};
