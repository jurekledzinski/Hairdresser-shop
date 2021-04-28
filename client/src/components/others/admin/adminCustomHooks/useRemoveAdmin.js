import React from "react";
import { useDispatch } from "react-redux";

import {
  addServerErrorMessage,
  addServerSuccessMessage,
} from "../../../../reduxStore/actions/actionAlertsMessages";

import { deleteAdmin } from "../../../../utils/sessions";

const useRemoveAdmin = (
  adminsAllData,
  currentIdAdmin,
  setAdminsAllData,
  setIsOpenModal
) => {
  const dispatch = useDispatch();

  const deepCopyCurrentAdmins = () => {
    let copy = [];
    adminsAllData.forEach((item) => {
      const singleItem = { ...item };
      copy = [...copy, singleItem];
    });

    return copy;
  };

  const handleRemoveItem = async () => {
    const { data, status } = await deleteAdmin(currentIdAdmin);

    if (status === 200) {
      dispatch(addServerSuccessMessage(data.success, "permissionAdmin"));
      let newCopy = deepCopyCurrentAdmins();
      const updatedAdmins = newCopy.filter(
        (item) => item._id !== currentIdAdmin
      );
      setAdminsAllData(updatedAdmins);
      setIsOpenModal(false);
    } else {
      dispatch(addServerErrorMessage(data.alert, "permissionAdmin"));
    }
  };

  return { handleRemoveItem };
};

export default useRemoveAdmin;
