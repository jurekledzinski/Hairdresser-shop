export const ADD_MENU_LINKS = "ADD_MENU_LINKS";
export const REMOVE_MENU_LINKS = "REMOVE_MENU_LINKS";

export const addLinksMenuHeader = (ref) => ({
  type: ADD_MENU_LINKS,
  payload: ref,
});

export const removeLinksMenuHeader = (ref) => ({
  type: REMOVE_MENU_LINKS,
  payload: ref,
});
