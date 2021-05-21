export const CLOSE_DIV_CHOOSE_SERVICE = "CLOSE_DIV_CHOOSE_SERVICE";

export const setCloseDivChooseService = (data) => ({
  type: CLOSE_DIV_CHOOSE_SERVICE,
  payload: {
    isOpen: data,
  },
});
