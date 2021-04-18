export const ADD_SECTION = "ADD_SECTION";
export const CLEAR_SECTIONS = "CLEAR_SECTIONS";

export const addSingleSection = (ref) => ({
  type: ADD_SECTION,
  payload: ref,
});

export const clearSections = (ref) => ({
  type: CLEAR_SECTIONS,
  payload: ref,
});
