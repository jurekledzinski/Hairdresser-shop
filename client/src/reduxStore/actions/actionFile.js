export const ADD_FILE = "ADD_FILE";
export const REMOVE_FILE = "REMOVE_FILE";

export const addImageFile = (
  fileImageTestimonial,
  fileImageRegister,
  fileImageGallery,
  fileImageGalleryEdit,
  fileImageEditProfile,
  fileImageService,
  fileEditImageService
) => ({
  type: ADD_FILE,
  payload: {
    fileImageTestimonial,
    fileImageRegister,
    fileImageGallery,
    fileImageGalleryEdit,
    fileImageEditProfile,
    fileImageService,
    fileEditImageService,
  },
});

export const removeImageFile = (
  fileImageTestimonial,
  fileImageRegister,
  fileImageGallery,
  fileImageGalleryEdit,
  fileImageEditProfile,
  fileImageService,
  fileEditImageService
) => ({
  type: REMOVE_FILE,
  payload: {
    fileImageTestimonial,
    fileImageRegister,
    fileImageGallery,
    fileImageGalleryEdit,
    fileImageEditProfile,
    fileImageService,
    fileEditImageService,
  },
});
