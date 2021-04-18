export const ADD_FILE = "ADD_FILE";
export const REMOVE_FILE = "REMOVE_FILE";

export const addImageFile = (fileImageTestimonial, fileImageRegister) => ({
  type: ADD_FILE,
  payload: {
    fileImageTestimonial,
    fileImageRegister,
  },
});

export const removeImageFile = (fileImageTestimonial, fileImageRegister) => ({
  type: REMOVE_FILE,
  payload: {
    fileImageTestimonial,
    fileImageRegister,
  },
});
