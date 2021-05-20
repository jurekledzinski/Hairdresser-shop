export const ADD_IMAGE_GALLERY = "ADD_IMAGE_GALLERY";
export const REMOVE_IMAGE_GALLERY = "REMOVE_IMAGE_GALLERY";

export const addImageGallery = (image) => ({
  type: ADD_IMAGE_GALLERY,
  payload: image,
});

export const removeImageGallery = () => ({
  type: REMOVE_IMAGE_GALLERY,
  payload: [],
});
