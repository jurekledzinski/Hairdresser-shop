import React from "react";
import { useDispatch } from "react-redux";

import {
  addServerErrorMessage,
  addServerSuccessMessage,
} from "../../../../reduxStore/actions/actionAlertsMessages";

import { deleteAdminService } from "../../../../utils/sessions";

import useDeleteFileFirebase from "../../../../customHooks/useDeleteFileFirebase";

const useRemoveService = (
  currentServices,
  idService,
  imgUrl,
  setCurrentServices,
  setIsOpenModal
) => {
  const { deleteImgFirebase } = useDeleteFileFirebase();
  const dispatch = useDispatch();

  const deepCopyCurrentServices = () => {
    let copy = [];
    currentServices.forEach((item) => {
      const singleItem = { ...item };
      copy = [...copy, singleItem];
    });

    return copy;
  };

  const handleRemoveItem = async () => {
    const { data, status } = await deleteAdminService(idService);

    if (status === 200) {
      deleteImgFirebase(imgUrl.current);
      dispatch(addServerSuccessMessage(data.success, "removeAtTableAdmin"));
      let newCopy = deepCopyCurrentServices();
      const updatedService = newCopy.filter((item) => item._id !== idService);
      setCurrentServices(updatedService);
      setIsOpenModal(false);
    } else {
      dispatch(addServerErrorMessage(data.alert, "removeAtTableAdmin"));
    }
  };

  return { handleRemoveItem };
};

export default useRemoveService;
