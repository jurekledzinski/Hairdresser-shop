export const ADD_OPINION = "ADD_OPINION";
export const CLEAR_OPINION = "CLEAR_OPINION";
export const REMOVE_OPINION = "REMOVE_OPINION";

export const addOpinion = (opinion) => ({
  type: ADD_OPINION,
  payload: opinion,
});

export const removeOpinion = (id) => ({
  type: REMOVE_OPINION,
  payload: {
    id: id,
  },
});

export const clearOpinionData = () => ({
  type: CLEAR_OPINION,
});
