import {
  ADD_IMAGE_GALLERY,
  REMOVE_IMAGE_GALLERY,
} from "../actions/actionGalleryImages";

export const galleryImagesReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_IMAGE_GALLERY:
      return action.payload;
    case REMOVE_IMAGE_GALLERY:
      return [];
    default:
      return state;
  }
};
