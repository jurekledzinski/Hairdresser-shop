export const ADD_MAIN_PAGE_OPINIONS = "ADD_MAIN_PAGE_OPINIONS";
export const ADD_SINGLE_MAIN_PAGE_OPINION = "ADD_SINGLE_MAIN_PAGE_OPINION";

export const addMainPageOpinions = (opinion) => ({
  type: ADD_MAIN_PAGE_OPINIONS,
  payload: {
    opinions: opinion,
  },
});

export const addSingleMainPageOpinion = (singleOpinion) => ({
  type: ADD_SINGLE_MAIN_PAGE_OPINION,
  payload: {
    opinions: singleOpinion,
  },
});
