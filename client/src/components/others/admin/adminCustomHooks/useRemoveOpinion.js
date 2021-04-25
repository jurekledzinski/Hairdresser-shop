import React from "react";
import { useDispatch } from "react-redux";

import {
  addServerErrorMessage,
  addServerSuccessMessage,
} from "../../../../reduxStore/actions/actionAlertsMessages";

import { deleteOpinion } from "../../../../utils/sessions";

const useRemoveOpinion = (
  currentOpinions,
  idOpinion,
  setCurrentOpinions,
  setIsOpenModal
) => {
  const dispatch = useDispatch();

  const deepCopyCurrentOpinions = () => {
    let copy = [];
    currentOpinions.forEach((item) => {
      const singleItem = { ...item };
      copy = [...copy, singleItem];
    });

    return copy;
  };

  const handleRemoveItem = async () => {
    const { data, status } = await deleteOpinion(idOpinion);

    if (status === 200) {
      dispatch(addServerSuccessMessage(data.success, "removeAtTableAdmin"));
      let newCopy = deepCopyCurrentOpinions();
      const updatedOpinions = newCopy.filter((item) => item._id !== idOpinion);
      setCurrentOpinions(updatedOpinions);
      setIsOpenModal(false);
    } else {
      dispatch(addServerErrorMessage(data.alert, "removeAtTableAdmin"));
    }
  };

  return { handleRemoveItem };
};

export default useRemoveOpinion;
