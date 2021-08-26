export const GET_SIZE_WINDOW = "GET_SIZE_WINDOW";

export const getCurrentSizeWindow = (size) => ({
  type: GET_SIZE_WINDOW,
  payload: {
    size,
  },
});
