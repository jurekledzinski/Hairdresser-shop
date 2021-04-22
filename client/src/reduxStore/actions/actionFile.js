export const ADD_FILE = "ADD_FILE";
export const REMOVE_FILE = "REMOVE_FILE";

export const addImageFile = (
  fileImageTestimonial,
  fileImageRegister,
  fileImageGallery,
  fileImageGalleryEdit
) => ({
  type: ADD_FILE,
  payload: {
    fileImageTestimonial,
    fileImageRegister,
    fileImageGallery,
    fileImageGalleryEdit,
  },
});

export const removeImageFile = (
  fileImageTestimonial,
  fileImageRegister,
  fileImageGallery,
  fileImageGalleryEdit
) => ({
  type: REMOVE_FILE,
  payload: {
    fileImageTestimonial,
    fileImageRegister,
    fileImageGallery,
    fileImageGalleryEdit,
  },
});
