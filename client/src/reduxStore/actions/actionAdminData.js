export const ADD_ADMIN_DATA = "ADD_ADMIN_DATA";
export const UPDATE_ADMIN_DATA = "UPDATE_ADMIN_DATA";
export const UPDATE_SINGLE_ADMIN_DATA = "UPDATE_SINGLE_ADMIN_DATA";
export const CLEAR_ADMIN_DATA = "CLEAR_ADMIN_DATA";

export const addAdminData = (dataAdmin) => ({
  type: ADD_ADMIN_DATA,
  payload: dataAdmin,
});

export const updateAdminData = (dataAdmin) => ({
  type: UPDATE_ADMIN_DATA,
  payload: {
    ...dataAdmin,
  },
});

export const updateSingleAdminData = (dataAdmin) => ({
  type: UPDATE_SINGLE_ADMIN_DATA,
  payload: {
    ...dataAdmin,
  },
});

export const clearAdminData = () => ({
  type: CLEAR_ADMIN_DATA,
});
