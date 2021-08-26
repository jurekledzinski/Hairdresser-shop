import React from "react";
import { useDispatch } from "react-redux";

import {
  addServerErrorMessage,
  addServerSuccessMessage,
} from "../../../../reduxStore/actions/actionAlertsMessages";

import { deleteOpinion } from "../../../../utils/sessions";

import { removeOpinion } from "../../../../reduxStore/actions/actionOpinionsData";

const useRemoveOpinion = (idOpinion, setIsOpenModal) => {
  const dispatch = useDispatch();

  const handleRemoveItem = async () => {
    const { data, status } = await deleteOpinion(idOpinion);

    if (status === 200) {
      dispatch(addServerSuccessMessage(data.success, "removeAtTableAdmin"));
      dispatch(removeOpinion(idOpinion));
      setIsOpenModal(false);
    } else {
      dispatch(addServerErrorMessage(data.alert, "removeAtTableAdmin"));
    }
  };

  return { handleRemoveItem };
};

export default useRemoveOpinion;
